import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup,FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { CategoriaComponent } from '../Categoria.component';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent  implements OnInit{


  categoriaForm !: FormGroup;
  actionBtn: string="guardar"
  titulo: string="Edita"
  categorias: any[] = [];
  disableSelect = new FormControl(false);


  
  constructor(private formBuilder: FormBuilder, 
      private api:ApiService, 

      @Inject(MAT_DIALOG_DATA) public editData: any,
      private dialogRef : MatDialogRef<DialogComponent>,

    ){}

  ngOnInit(): void {
    this.api.obtenerCategorias().subscribe((res) => {
      this.categorias = res;
    });
    this.actionBtn= "Guardar"
    this.titulo= "Crear"
    this.categoriaForm = this.formBuilder.group({
      nombreCategoria:['', Validators.required]
    })
    if (this.editData) {
      this.titulo="Editar"
      this.actionBtn= "Actualizar"
      this.categoriaForm.controls['nombreCategoria'].setValue(this.editData.nombreCategoria)
    }
    
  }

  agregarCategoria() {
      if (!this.editData) {
        if (this.categoriaForm.valid) {
          this.api.crearCategoria(this.categoriaForm.value).subscribe({
            next: (res)=>{
             
              this.categoriaForm.reset();
              this.dialogRef.close('guardado');
            },
            error:()=>{
              alert("No se pudo guardar la categoria");
            }
          })
        }
      }else{
        this.actualizarCategoria()
      }
  }
  
  actualizarCategoria(){
    this.api.editarCategoria(this.categoriaForm.value, this.editData.idCategoria)
    .subscribe({
      next:(res)=>{  
        this.categoriaForm.reset();
        this.dialogRef.close("actualizado");
      },
      error:()=>{
        alert("No se pudo actualizar categoria")
      }
    })
  }
  
  

}
