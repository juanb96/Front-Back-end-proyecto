import { Component, OnInit, Inject, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, AfterViewInit {

  modeloForm!: FormGroup;
  actionBtn: string = "guardar";
  id: string = "";
  titulo: string = "Editar";
  marcas: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.api.obtenerMarcas().subscribe((res) => {
      this.marcas = res;
    });

    this.actionBtn = "Guardar";
    this.titulo = "Crear";
    this.modeloForm = this.formBuilder.group({
      nombreModelo: ['', Validators.required],
      marca: ['', Validators.required]
    });

    if (this.editData) {
      this.titulo = "Editar";
      this.id = "ID: ";
      this.actionBtn = "Actualizar";
      this.modeloForm.controls['nombreModelo'].setValue(this.editData.nombreModelo);
      this.modeloForm.controls['marca'].setValue(this.editData.marca.idMarca);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  agregarModelo() {
    if (this.modeloForm.valid) {
      const modeloFormValue = { ...this.modeloForm.value };
      modeloFormValue.marca = { idMarca: modeloFormValue.marca };

      if (this.editData) {
        this.actualizarModelo();
      } else {
        this.crearModelo(modeloFormValue);
      }
    }
  }

  crearModelo(modelo: any) {
    this.api.crearModelo(modelo).subscribe({
      next: (res) => {
        console.log(res);
        this.modeloForm.reset();
        this.dialogRef.close('guardado');
      },
      error: () => {
        alert("No se pudo guardar el modelo");
      }
    });
  }

  actualizarModelo() {
    if (this.modeloForm.valid) {
      const modeloFormValue = { ...this.modeloForm.value };
      modeloFormValue.idModelo = this.editData.idModelo; // Agregar el ID del modelo al objeto del formulario
      modeloFormValue.marca = { idMarca: modeloFormValue.marca };

      this.api.editarModelo(modeloFormValue).subscribe(
        (res) => {
          this.modeloForm.reset();
          this.dialogRef.close("actualizado");
        },
        (error) => {
          alert("No se pudo actualizar el modelo");
        }
      );
    }
  }
}
