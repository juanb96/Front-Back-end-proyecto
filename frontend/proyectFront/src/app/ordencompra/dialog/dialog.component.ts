import { Component, OnInit, Inject, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, AfterViewInit {

  ordenCompraForm!: FormGroup;
  actionBtn: string = "guardar";
  id: string = "";
  titulo: string = "Editar";
  proveedores: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.api.obtenerProveedores().subscribe((res) => {
      this.proveedores = res;
    });
    this.actionBtn = "Guardar";
    this.titulo = "Crear";
    this.ordenCompraForm = this.formBuilder.group({
      fechaDeOrden: ['', Validators.required],
      proveedor: ['', Validators.required]
    });

    if (this.editData) {
      this.titulo = "Editar";
      this.id="ID: "
      this.actionBtn = "Actualizar";
      this.ordenCompraForm.controls['fechaDeOrden'].setValue(this.editData.fechaDeOrden);
      this.ordenCompraForm.controls['proveedor'].setValue(this.editData.proveedor.idProveedor);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  agregarProveedor() {
    if (this.ordenCompraForm.valid) {
      const ordenCompraFormValue = { ...this.ordenCompraForm.value };
      ordenCompraFormValue.proveedor = { idProveedor: ordenCompraFormValue.proveedor };

      if (this.editData) {
        this.actualizaOrdenCompra();
      } else {
        this.crearOrdenCompra(ordenCompraFormValue);
      }
    }
  }

  crearOrdenCompra(ordenCompra: any) {
    this.api.crearOrdendeCompra(ordenCompra).subscribe({
      next: (res) => {
        console.log(res);
        this.ordenCompraForm.reset();
        this.dialogRef.close('guardado');
      },
      error: () => {
        alert("No se pudo guardar la orden de compra");
      }
    });
  }

  actualizaOrdenCompra() {
    if (this.ordenCompraForm.valid) {
      const ordenCompraFormValue = { ...this.ordenCompraForm.value };
      ordenCompraFormValue.idOrdenCompra = this.editData.idOrdenCompra; // Agregar el ID del modelo al objeto del formulario
      ordenCompraFormValue.proveedor = { idProveedor: ordenCompraFormValue.proveedor };

      this.api.editarOrdendeCompra(ordenCompraFormValue).subscribe(
        (res) => {
          this.ordenCompraForm.reset();
          this.dialogRef.close("actualizado");
        },
        (error) => {
          alert("No se pudo actualizar la orden de compra");
        }
      );
    }
  }
}
