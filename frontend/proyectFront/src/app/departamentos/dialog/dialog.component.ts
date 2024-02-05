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
  departamentoForm!: FormGroup;
  actionBtn: string = "guardar";
  titulo: string = "Editar";

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
  ) {}

  ngOnInit(): void {
    this.actionBtn = "Guardar";
    this.titulo = "Crear";

    this.departamentoForm = this.formBuilder.group({
      nombre: ['', Validators.required]
    });

    if (this.editData) {
      this.titulo = "Editar";
      this.actionBtn = "Actualizar";
      this.departamentoForm.controls['nombre'].setValue(this.editData.nombre);
    }
  }

  guardarDepartamento() {
    if (!this.editData) {
      if (this.departamentoForm.valid) {
        this.api.crearDepartamento(this.departamentoForm.value).subscribe({
          next: (res) => {
            this.departamentoForm.reset();
            this.dialogRef.close('guardado');
          },
          error: () => {
            alert("No se pudo guardar el departamento");
          }
        });
      }
    } else {
      this.actualizarDepartamento();
    }
  }

  actualizarDepartamento() {
    this.api.editarDepartamento(this.departamentoForm.value, this.editData.id).subscribe({
      next: (res) => {
        this.departamentoForm.reset();
        this.dialogRef.close("actualizado");
      },
      error: () => {
        alert("No se pudo actualizar el departamento");
      }
    });
  }
}
