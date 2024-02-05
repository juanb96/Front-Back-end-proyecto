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
  cargoForm!: FormGroup;
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

    this.cargoForm = this.formBuilder.group({
      nombre: ['', Validators.required]
    });

    if (this.editData) {
      this.titulo = "Editar";
      this.actionBtn = "Actualizar";
      this.cargoForm.controls['nombre'].setValue(this.editData.nombre);
    }
  }

  guardarCargo() {
    if (!this.editData) {
      if (this.cargoForm.valid) {
        this.api.crearCargo(this.cargoForm.value).subscribe({
          next: (res) => {
            this.cargoForm.reset();
            this.dialogRef.close('guardado');
          },
          error: () => {
            alert("No se pudo guardar el cargo");
          }
        });
      }
    } else {
      this.actualizarCargo();
    }
  }

  actualizarCargo() {
    this.api.editarCargo(this.cargoForm.value, this.editData.id).subscribe({
      next: (res) => {
        this.cargoForm.reset();
        this.dialogRef.close("actualizado");
      },
      error: () => {
        alert("No se pudo actualizar el cargo");
      }
    });
  }
}