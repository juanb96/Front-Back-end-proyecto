import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  comentarioForm!: FormGroup;
  actionBtn: string = "guardar";
  titulo: string = "Edita";
  id: string = "";
  productos: any[] = [];
  usuarios: any[] = [];
  disableSelect = new FormControl(false);

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
  ) { }

  ngOnInit(): void {
    this.api.obtenerProductos().subscribe((res) => {
      this.productos = res;
    });

    this.api.obtenerUsuarios().subscribe((res) => {
      this.usuarios = res;
    });

    this.actionBtn = "Guardar";
    this.titulo = "Crear";
    this.comentarioForm = this.formBuilder.group({
      producto: ['', Validators.required],
      usuario: ['', Validators.required],
      comentario: ['', Validators.required],
      fechaDeComentario: ['', Validators.required]
    });

    if (this.editData) {
      this.titulo = "Editar";
      this.id = "ID: ";
      this.actionBtn = "Actualizar";
      this.comentarioForm.controls['producto'].setValue(this.editData.producto.idProducto);
      this.comentarioForm.controls['usuario'].setValue(this.editData.usuario.idUsuario);
      this.comentarioForm.controls['comentario'].setValue(this.editData.comentario);
      this.comentarioForm.controls['fechaDeComentario'].setValue(this.editData.fechaDeComentario);
    }
  }

  agregarComentario() {
    if (this.comentarioForm.valid) {
      const comentarioFormValue = { ...this.comentarioForm.value };
      comentarioFormValue.producto = { idProducto: comentarioFormValue.producto };
      comentarioFormValue.usuario = { idUsuario: comentarioFormValue.usuario };

      if (this.editData) {
        this.actualizarComentario();
      } else {
        this.crearComentario(comentarioFormValue);
      }
    }
  }

  crearComentario(comentario: any) {
    this.api.crearComentario(comentario).subscribe({
      next: (res) => {
        console.log(res);
        this.comentarioForm.reset();
        this.dialogRef.close('guardado');
      },
      error: () => {
        alert("No se pudo guardar el comentario");
      }
    });
  }

  actualizarComentario() {
    if (this.comentarioForm.valid) {
      const comentarioFormValue = { ...this.comentarioForm.value };
      comentarioFormValue.idComentario = this.editData.idComentario; // Agregar el ID del comentario al objeto del formulario
      comentarioFormValue.producto = { idProducto: comentarioFormValue.producto };
      comentarioFormValue.usuario = { idUsuario: comentarioFormValue.usuario };

      this.api.editarComentario(comentarioFormValue)
        .subscribe(
          (res) => {
            this.comentarioForm.reset();
            this.dialogRef.close("actualizado");
          },
          (error) => {
            alert("No se pudo actualizar el comentario");
          }
        );
    }
  }

}
