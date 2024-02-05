import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  marcaForm!: FormGroup;
  id: string=""
  actionBtn: string = "guardar";
  titulo: string = "Edita";
  marcas: any[] = [];
  disableSelect = new FormControl(false);

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
    this.api.obtenerMarcas().subscribe((res) => {
      this.marcas = res;
    });

    this.actionBtn = "Guardar";
    this.titulo = "Crear";
    this.marcaForm = this.formBuilder.group({
      nombreMarca: ['', Validators.required]
    });

    if (this.editData) {
      this.id="ID: "
      this.titulo = "Editar";
      this.actionBtn = "Actualizar";
      this.marcaForm.controls['nombreMarca'].setValue(this.editData.nombreMarca);
    }
  }

  agregarMarca() {
    if (this.marcaForm.valid) {
      const marcaFormValue = { ...this.marcaForm.value };
      if (this.editData) {
        this.actualizarMarca();
      } else {
        this.crearMarca(marcaFormValue);
      }
    }
  }

  crearMarca(marca: any) {
    this.api.crearMarca(marca).subscribe({
      next: (res) => {
        console.log(res);
        this.marcaForm.reset();
        this.dialogRef.close('guardado');
      },
      error: () => {
        alert("No se pudo guardar la marca");
      }
    });
  }

  actualizarMarca() {
    if (this.marcaForm.valid) {
      const marcaFormValue = { ...this.marcaForm.value };
      marcaFormValue.idMarca = this.editData.idMarca;
      this.api.editarMarca(marcaFormValue).subscribe(
        (res) => {
          this.marcaForm.reset();
          this.dialogRef.close("actualizado");
        },
        (error) => {
          alert("No se pudo actualizar la marca");
        }
      );
    }
  }
}
