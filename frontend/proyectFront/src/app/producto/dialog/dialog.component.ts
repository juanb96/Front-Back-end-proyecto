import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup,FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  productoForm !: FormGroup;
  actionBtn: string="guardar"
  id: string=""
  titulo: string="Edita"
  productos: any[] = [];
  disableSelect = new FormControl(false);



  categorias: any[] = []; 


  
  constructor(private formBuilder: FormBuilder, 
      private api:ApiService, 

      @Inject(MAT_DIALOG_DATA) public editData: any,
      private dialogRef : MatDialogRef<DialogComponent>,

    ){}

    ngOnInit(): void {
      this.api.obtenerProductos().subscribe((res) => {
        this.productos = res;
      });
  
      this.api.obtenerCategorias().subscribe((res) => { // Agrega esta línea
        this.categorias = res;
      });
  
    this.actionBtn= "Guardar"
    
    this.titulo= "Crear"
    this.productoForm = this.formBuilder.group({
      nombre:['', Validators.required],
      descripcion:['', Validators.required],
      precioUnitario:['', Validators.required],
      stock:['', Validators.required],
      categoria:['', Validators.required],
    })
    if (this.editData) {
      this.titulo="Editar"
      this.id="ID: "
      this.actionBtn= "Actualizar"
      this.productoForm.controls['nombre'].setValue(this.editData.nombre)
      this.productoForm.controls['descripcion'].setValue(this.editData.descripcion)
      this.productoForm.controls['precioUnitario'].setValue(this.editData.precioUnitario)
      this.productoForm.controls['stock'].setValue(this.editData.stock)
      this.productoForm.controls['categoria'].setValue(this.editData.categoria.idCategoria)
    }
    
  }
  agregarProducto() {
    if (this.productoForm.valid) {
      const productoFormValue = { ...this.productoForm.value };
      productoFormValue.categoria = { idCategoria: productoFormValue.categoria };

      if (this.editData) {
        this.actualizarProducto();
      } else {
        this.crearProducto(productoFormValue);
      }
    }
  }

  crearProducto(producto: any) {
    this.api.crearProducto(producto).subscribe({
      next: (res) => {
        console.log(res);
        this.productoForm.reset();
        this.dialogRef.close('guardado');
      },
      error: () => {
        alert("No se pudo guardar el producto");
      }
    });
  }

  actualizarProducto() {
    if (this.productoForm.valid) {
      const productoFormValue = { ...this.productoForm.value };
      productoFormValue.idProducto = this.editData.idProducto; // Agregar el ID del producto al objeto del formulario
      productoFormValue.categoria = { idCategoria: productoFormValue.categoria };
  
      this.api.editarProducto(productoFormValue)
        .subscribe(
          (res) => {  
            this.productoForm.reset();
            this.dialogRef.close("actualizado");
          },
          (error) => {
            alert("No se pudo actualizar el producto");
          }
        );
    }
  }
  
  
}
 
  
 
  
  


