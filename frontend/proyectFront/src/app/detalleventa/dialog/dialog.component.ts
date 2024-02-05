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

  detalleVentaForm!: FormGroup;
  actionBtn: string = "guardar";
  id: string = "";
  titulo: string = "Editar";
  productos: any[] = [];
  ventas: any[] = [];

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

    this.api.obtenerVentas().subscribe((res) => {
      this.ventas = res;
    });

    this.actionBtn = "Guardar";
    this.titulo = "Crear";
    this.detalleVentaForm = this.formBuilder.group({
      venta: ['', Validators.required],
      producto: ['', Validators.required],
      cantidad: ['', Validators.required],
      precioUnitario: ['', Validators.required]
    });

    if (this.editData) {
      this.titulo = "Editar";
      this.id= "ID: "
      this.actionBtn = "Actualizar";
      this.detalleVentaForm.controls['venta'].setValue(this.editData.venta.idVenta);
      this.detalleVentaForm.controls['producto'].setValue(this.editData.producto.idProducto);
      this.detalleVentaForm.controls['cantidad'].setValue(this.editData.cantidad);
      this.detalleVentaForm.controls['precioUnitario'].setValue(this.editData.precioUnitario);
    }
  }

  agregarDetalleVenta() {
    if (this.detalleVentaForm.valid) {
      const detalleVentaFormValue = { ...this.detalleVentaForm.value };
      detalleVentaFormValue.venta = { idVenta: detalleVentaFormValue.venta };
      detalleVentaFormValue.producto = { idProducto: detalleVentaFormValue.producto };

      if (this.editData) {
        this.actualizarDetalleVenta();
      } else {
        this.crearDetalleVenta(detalleVentaFormValue);
      }
    }
  }

  crearDetalleVenta(detalleVenta: any) {
    this.api.crearDetalleVenta(detalleVenta).subscribe({
      next: (res) => {
        console.log(res);
        this.detalleVentaForm.reset();
        this.dialogRef.close('guardado');
      },
      error: () => {
        alert("No se pudo guardar el detalle de venta");
      }
    });
  }

  actualizarDetalleVenta() {
    if (this.detalleVentaForm.valid) {
      const detalleVentaFormValue = { ...this.detalleVentaForm.value };
      detalleVentaFormValue.idDetalleVenta = this.editData.idDetalleVenta; // Agregar el ID del detalle de venta al objeto del formulario
      detalleVentaFormValue.venta = { idVenta: detalleVentaFormValue.venta };
      detalleVentaFormValue.producto = { idProducto: detalleVentaFormValue.producto };

      this.api.editarDetalleVenta(detalleVentaFormValue)
        .subscribe(
          (res) => {
            this.detalleVentaForm.reset();
            this.dialogRef.close("actualizado");
          },
          (error) => {
            alert("No se pudo actualizar el detalle de venta");
          }
        );
    }
  }
}
