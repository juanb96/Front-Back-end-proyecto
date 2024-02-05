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

  ventaForm!: FormGroup;
  actionBtn: string = "guardar";
  id: string = "";
  titulo: string = "Edita";

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
    this.actionBtn = "Guardar";
    this.titulo = "Crear";
    this.ventaForm = this.formBuilder.group({
      fechaDeVenta: ['', Validators.required]
    });

    if (this.editData) {
      this.titulo = "Editar";
      this.id = "ID: "
      this.actionBtn = "Actualizar";
      this.ventaForm.controls['fechaDeVenta'].setValue(this.editData.fechaDeVenta);
    }
  }

  agregarVenta() {
    if (this.ventaForm.valid) {
      const ventaFormValue = { ...this.ventaForm.value };
      if (this.editData) {
        this.actualizarVenta();
      } else {
        this.crearVenta(ventaFormValue);
      }
    }
  }

  crearVenta(venta: any) {
    this.api.crearVenta(venta).subscribe({
      next: (res) => {
        console.log(res);
        this.ventaForm.reset();
        this.dialogRef.close('guardado');
      },
      error: () => {
        alert("No se pudo guardar la venta");
      }
    });
  }

  actualizarVenta() {
    if (this.ventaForm.valid) {
      const ventaFormValue = { ...this.ventaForm.value };
      ventaFormValue.idVenta = this.editData.idVenta;
      this.api.editarVenta(ventaFormValue).subscribe(
        (res) => {
          this.ventaForm.reset();
          this.dialogRef.close("actualizado");
        },
        (error) => {
          alert("No se pudo actualizar la venta");
        }
      );
    }
  }
}
