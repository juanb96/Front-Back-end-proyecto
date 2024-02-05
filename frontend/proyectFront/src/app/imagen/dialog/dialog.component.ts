import { Component, OnInit, Inject, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit {

  imagenForm!: FormGroup;
  actionBtn: string = "guardar";
  id: string = "";
  titulo: string = "Editar";
  imagenes: any[] = [];
  disableSelect = new FormControl(false);
  productos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.api.obtenerImagenes().subscribe((res) => {
      this.imagenes = res;
    });

    this.api.obtenerProductos().subscribe((res) => {
      this.productos = res;
    });

    this.actionBtn = "Guardar";
    this.titulo = "Crear";
    this.imagenForm = this.formBuilder.group({
      producto: ['', Validators.required],
      urlImagen: ['', Validators.required],
    });

    if (this.editData) {
      this.titulo = "Editar";
      this.id = "ID: ";
      this.actionBtn = "Actualizar";
      this.imagenForm.controls['producto'].setValue(this.editData.producto.idProducto);
      this.imagenForm.controls['urlImagen'].setValue(this.editData.urlImagen);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  agregarImagen() {
    if (this.imagenForm.valid) {
      const imagenFormValue = { ...this.imagenForm.value };
      imagenFormValue.producto = { idProducto: imagenFormValue.producto };

      if (this.editData) {
        this.actualizarImagen();
      } else {
        this.crearImagen(imagenFormValue);
      }
    }
  }

  crearImagen(producto: any) {
    this.api.crearImagen(producto).subscribe({
      next: (res) => {
        console.log(res);
        this.imagenForm.reset();
        this.dialogRef.close('guardado');
      },
      error: () => {
        alert("No se pudo guardar el producto");
      }
    });
  }

  actualizarImagen() {
    if (this.imagenForm.valid) {
      const imagenFormValue = { ...this.imagenForm.value };
      imagenFormValue.idImagen = this.editData.idImagen; // Agregar el ID de la imagen al objeto del formulario
      imagenFormValue.producto = { idProducto: imagenFormValue.producto };

      this.api.editarImagen(imagenFormValue)
        .subscribe(
          (res) => {
            this.imagenForm.reset();
            this.dialogRef.close("actualizado");
          },
          (error) => {
            alert("No se pudo actualizar el producto");
          }
        );
    }
  }
}
