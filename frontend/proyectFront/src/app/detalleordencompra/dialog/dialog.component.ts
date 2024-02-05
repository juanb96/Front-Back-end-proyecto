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

  detalleOrdenCompraForm!: FormGroup;
  actionBtn: string = "Guardar";
  id: string = "";
  titulo: string = "Crear";
  productos: any[] = [];
  ordenesCompras: any[] = [];

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

    this.api.obtenerOrdenesdeCompra().subscribe((res) => {
      this.ordenesCompras = res;
    });

    this.detalleOrdenCompraForm = this.formBuilder.group({
      ordenDeCompra: ['', Validators.required],
      producto: ['', Validators.required],
      cantidad: ['', Validators.required],
      precioUnitario: ['', Validators.required]
    });

    if (this.editData) {
      this.titulo = "Editar";
      this.id = "ID: ";
      this.actionBtn = "Actualizar";
      this.detalleOrdenCompraForm.controls['ordenDeCompra'].setValue(this.editData.ordenDeCompra.idOrdenCompra);
      this.detalleOrdenCompraForm.controls['producto'].setValue(this.editData.producto.idProducto);
      this.detalleOrdenCompraForm.controls['cantidad'].setValue(this.editData.cantidad);
      this.detalleOrdenCompraForm.controls['precioUnitario'].setValue(this.editData.precioUnitario);
    }
  }

  agregarOrdenDetalleCompra() {
    if (this.detalleOrdenCompraForm.valid) {
      const detalleOrdenCompraFormValue = { ...this.detalleOrdenCompraForm.value };
      detalleOrdenCompraFormValue.ordenDeCompra = { idOrdenCompra: detalleOrdenCompraFormValue.ordenDeCompra };
      detalleOrdenCompraFormValue.producto = { idProducto: detalleOrdenCompraFormValue.producto };

      if (this.editData) {
        this.actualizarOrdenDetalleCompra();
      } else {
        this.crearOrdenDetalleCompra(detalleOrdenCompraFormValue);
      }
    }
  }

  crearOrdenDetalleCompra(detalleOrdenCompra: any) {
    this.api.crearDetallesOrdenCompra(detalleOrdenCompra).subscribe({
      next: (res) => {
        console.log(res);
        this.detalleOrdenCompraForm.reset();
        this.dialogRef.close('guardado');
      },
      error: () => {
        alert("No se pudo guardar el detalle de compra");
      }
    });
  }

  actualizarOrdenDetalleCompra() {
    if (this.detalleOrdenCompraForm.valid) {
      const detalleOrdenCompraFormValue = { ...this.detalleOrdenCompraForm.value };
      detalleOrdenCompraFormValue.idDetalleOrdenCompra = this.editData.idDetalleOrdenCompra; // Agregar el ID del detalle de compra al objeto del formulario
      detalleOrdenCompraFormValue.ordenDeCompra = { idOrdenCompra: detalleOrdenCompraFormValue.ordenDeCompra };
      detalleOrdenCompraFormValue.producto = { idProducto: detalleOrdenCompraFormValue.producto };

      this.api.editarDetallesOrdenCompra(detalleOrdenCompraFormValue)
        .subscribe(
          (res) => {
            this.detalleOrdenCompraForm.reset();
            this.dialogRef.close("actualizado");
          },
          (error) => {
            alert("No se pudo actualizar el detalle de compra");
          }
        );
    }
  }
}
