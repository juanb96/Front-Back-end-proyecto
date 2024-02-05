import { Component, OnInit, Inject , ChangeDetectorRef } from '@angular/core';
import { FormGroup,FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  productoProveedorForm !: FormGroup;
  actionBtn: string="guardar"
  id: string=""
  titulo: string="Edita"
  productosproveedores: any[] = [];
  disableSelect = new FormControl(false);
  productos: any[] = []; 
  proveedores: any[] = []; 

  constructor(private formBuilder: FormBuilder, 
    private api:ApiService, 
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef : MatDialogRef<DialogComponent>,

  ){}

  ngOnInit(): void {
    this.api.obtenerProductosProveedores().subscribe((res) => {
      this.productos = res;
      this.proveedores= res;
    });

    this.api.obtenerProductos().subscribe((res) => {
      this.productos = res;
      // Verificar si hay datos de edición y establecer el valor del campo 'producto'
      if (this.editData) {
        const productoId = this.editData.producto.idProducto;
        this.productoProveedorForm.controls['producto'].setValue(productoId);
      }
    });

    this.api.obtenerProveedores().subscribe((res) => {
      this.proveedores = res;
      // Verificar si hay datos de edición y establecer el valor del campo 'proveedor'
      if (this.editData) {
        const proveedorId = this.editData.proveedor.idProveedor;
        this.productoProveedorForm.controls['proveedor'].setValue(proveedorId);
      }
    });

  this.actionBtn= "Guardar"
  this.titulo= "Crear"
  this.productoProveedorForm = this.formBuilder.group({
    producto:['', Validators.required],
    proveedor:['', Validators.required],
  })
  if (this.editData) {
    this.titulo="Editar"
    this.id="ID: "
    this.actionBtn= "Actualizar"
    this.productoProveedorForm.controls['producto'].setValue(this.editData.producto.ididProducto)
    this.productoProveedorForm.controls['proveedor'].setValue(this.editData.proveedor.idProveedor)
  }
  
}
agregarProductoProveedor() {
  if (this.productoProveedorForm.valid) {
    const productoProveedorForm = { ...this.productoProveedorForm.value };
    productoProveedorForm.producto = { idProducto: productoProveedorForm.producto };
    productoProveedorForm.proveedor ={idProveedor: productoProveedorForm.proveedor};
    if (this.editData) {
      this.actualizarProductoProveedor();
    } else {
      this.crearProductoProveedor(productoProveedorForm);
    }
  }
}

crearProductoProveedor(productoproveedor: any) {
  this.api.crearProductoProveedor(productoproveedor).subscribe({
    next: (res) => {
      console.log(res);
      this.productoProveedorForm.reset();
      this.dialogRef.close('guardado');
    },
    error: () => {
      alert("No se pudo guardar el producto");
    }
  });
}

actualizarProductoProveedor() {
  if (this.productoProveedorForm.valid) {
    const productoProveedorForm = { ...this.productoProveedorForm.value };
    productoProveedorForm.idProveedorProducto = this.editData.idProveedorProducto; // Agregar el ID del producto al objeto del formulario
    productoProveedorForm.producto = { idProducto: productoProveedorForm.producto };
    productoProveedorForm.proveedor = { idProveedor: productoProveedorForm.proveedor };

    this.api.editarProductoProveedor(productoProveedorForm)
      .subscribe(
        (res) => {  
          
          this.productoProveedorForm.reset();
          setTimeout(() => {
            this.cdr.detectChanges();
            this.dialogRef.close("actualizado");
          });
          
        },
        (error) => {
          alert("No se pudo actualizar el producto");
        }
      );
  }
}

}
