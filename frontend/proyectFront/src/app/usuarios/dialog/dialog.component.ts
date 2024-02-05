import { Component, OnInit, Inject, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  usuarioForm!: FormGroup;
  actionBtn: string = "guardar";
  id: string = "";
  titulo: string = "Editar";
  usuarios: any[] = [];
  disableSelect = new FormControl(false);
  tiposUsuarios: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.api.obtenerUsuarios().subscribe((res) => {
      this.usuarios = res;
    });

    this.api.obtenerTiposUsuario().subscribe((res) => {
      this.tiposUsuarios = res;
    });

    this.actionBtn = "Guardar";
    this.titulo = "Crear";
    this.usuarioForm = this.formBuilder.group({
      nombreUsuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      correoElectronico: ['', Validators.required],
      tipoUsuario: ['', Validators.required]
    });

    if (this.editData) {
      this.id= "ID: "
      this.titulo = "Editar"
      this.actionBtn = "Actualizar"
      this.usuarioForm.controls['nombreUsuario'].setValue(this.editData.nombreUsuario)
      this.usuarioForm.controls['contrasena'].setValue(this.editData.contrasena)
      this.usuarioForm.controls['correoElectronico'].setValue(this.editData.correoElectronico)
      this.usuarioForm.controls['tipoUsuario'].setValue(this.editData.tipoUsuario.idTipoUsuario)  
    }
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  agregarUsuario() {
    if (this.usuarioForm.valid) {
      const usuarioFormValue = { ...this.usuarioForm.value };
      usuarioFormValue.tipoUsuario = { idTipoUsuario: usuarioFormValue.tipoUsuario };

      if (this.editData) {
        this.actualizarUsuario();
      } else {
        this.crearUsuario(usuarioFormValue);
      } 
    }
  }

  crearUsuario(usuario: any) {
    this.api.crearUsuario(usuario).subscribe({
      next: (res) => {
        console.log(res);
        this.usuarioForm.reset();
        this.dialogRef.close('guardado');
      },
      error: () => {
        alert("No se pudo guardar el producto");
      }
    });
  }

  actualizarUsuario() {
    if (this.usuarioForm.valid) {
      const usuarioFormValue = { ...this.usuarioForm.value };
      usuarioFormValue.idUsuario = this.editData.idUsuario; // Agregar el ID de la imagen al objeto del formulario
      usuarioFormValue.tipoUsuario = { idTipoUsuario: usuarioFormValue.tipoUsuario };

      this.api.editarUsuario(usuarioFormValue)
        .subscribe(
          (res) => {
            this.usuarioForm.reset();
            this.dialogRef.close("actualizado");
          },
          (error) => {
            alert("No se pudo actualizar el producto");
          }
        );
    }
  }
}
