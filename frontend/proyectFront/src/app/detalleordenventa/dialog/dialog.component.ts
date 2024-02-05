import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  detalleOrdenVentaForm!: FormGroup;
  actionBtn: string = "Guardar";
  titulo: string = "Crear";
  id: string = "";
  productos: any[] = [];
  ordenesVentas: any[] = [];

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

    this.api.obtenerOrdenesdeVenta().subscribe((res) => {
      this.ordenesVentas = res;
    });

    this.detalleOrdenVentaForm = this.formBuilder.group({
      ordenVenta: ['', Validators.required],
      producto: ['', Validators.required],
      cantidad: ['', Validators.required],
      precioUnitario: ['', Validators.required]
    });

    if (this.editData) {
      this.titulo = "Editar";
      this.id = "ID: ";
      this.actionBtn = "Actualizar";
      this.detalleOrdenVentaForm.controls['ordenVenta'].setValue(this.editData.ordenVenta.idOrdenVenta);
      this.detalleOrdenVentaForm.controls['producto'].setValue(this.editData.producto.idProducto);
      this.detalleOrdenVentaForm.controls['cantidad'].setValue(this.editData.cantidad);
      this.detalleOrdenVentaForm.controls['precioUnitario'].setValue(this.editData.precioUnitario);
    }
  }

  agregarOrdenDetalleVenta() {
    if (this.detalleOrdenVentaForm.valid) {
      const detalleOrdenVentaFormValue = { ...this.detalleOrdenVentaForm.value };
      detalleOrdenVentaFormValue.ordenVenta = { idOrdenVenta: detalleOrdenVentaFormValue.ordenVenta };
      detalleOrdenVentaFormValue.producto = { idProducto: detalleOrdenVentaFormValue.producto };

      if (this.editData) {
        this.actualizarOrdenDetalleVenta();
      } else {
        this.crearOrdenDetalleVenta(detalleOrdenVentaFormValue);
      }
    }
  }

  crearOrdenDetalleVenta(detalleOrdenVenta: any) {
    this.api.crearDetalleOrdenVenta(detalleOrdenVenta).subscribe({
      next: (res) => {
        console.log(res);
        this.detalleOrdenVentaForm.reset();
        this.dialogRef.close('guardado');
      },
      error: () => {
        alert("No se pudo guardar el detalle de venta");
      }
    });
  }

  actualizarOrdenDetalleVenta() {
    if (this.detalleOrdenVentaForm.valid) {
      const detalleOrdenVentaFormValue = { ...this.detalleOrdenVentaForm.value };
      detalleOrdenVentaFormValue.idDetalleOrdenVenta = this.editData.idDetalleOrdenVenta; // Agregar el ID del detalle de venta al objeto del formulario
      detalleOrdenVentaFormValue.ordenVenta = { idOrdenVenta: detalleOrdenVentaFormValue.ordenVenta };
      detalleOrdenVentaFormValue.producto = { idProducto: detalleOrdenVentaFormValue.producto };

      this.api.editarDetalleOrdenVenta(detalleOrdenVentaFormValue)
        .subscribe(
          (res) => {
            this.detalleOrdenVentaForm.reset();
            this.dialogRef.close("actualizado");
          },
          (error) => {
            alert("No se pudo actualizar el detalle de venta");
          }
        );
    }
  }
}
