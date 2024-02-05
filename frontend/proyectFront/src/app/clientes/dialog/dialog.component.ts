import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  clienteForm!: FormGroup;
  actionBtn: string = "guardar";
  titulo: string = "Crear";
  id: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
    this.clienteForm = this.formBuilder.group({
      nombreCliente: ['', Validators.required],
      direccion: [''],
      correoElectronico: ['', Validators.email],
      numeroDeTelefono: ['']
    });

    if (this.editData) {
      this.titulo = "Editar";
      this.id = "ID: ";
      this.actionBtn = "Actualizar";
      this.clienteForm.patchValue(this.editData);
    }
  }

  agregarCliente() {
    if (this.clienteForm.valid) {
      const clienteFormValue = { ...this.clienteForm.value };
      if (this.editData) {
        this.actualizarCliente();
      } else {
        this.crearCliente(clienteFormValue);
      }
    }
  }

  crearCliente(cliente: any) {
    this.api.crearCliente(cliente).subscribe({
      next: (res) => {
        console.log(res);
        this.clienteForm.reset();
        this.dialogRef.close('guardado');
      },
      error: () => {
        alert("No se pudo guardar el cliente");
      }
    });
  }

  actualizarCliente() {
    if (this.clienteForm.valid) {
      const clienteFormValue = { ...this.clienteForm.value };
      clienteFormValue.idCliente = this.editData.idCliente;
      this.api.editarCliente(clienteFormValue).subscribe(
        (res) => {
          this.clienteForm.reset();
          this.dialogRef.close("actualizado");
        },
        (error) => {
          alert("No se pudo actualizar el cliente");
        }
      );
    }
  }
}
