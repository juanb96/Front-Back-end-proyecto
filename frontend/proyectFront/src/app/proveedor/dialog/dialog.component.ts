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

  proveedorForm !: FormGroup;
  actionBtn: string="guardar"
  
  titulo: string="Edita"
  proveedores: any[] = [];
  disableSelect = new FormControl(false);


  
  constructor(private formBuilder: FormBuilder, 
      private api:ApiService, 

      @Inject(MAT_DIALOG_DATA) public editData: any,
      private dialogRef : MatDialogRef<DialogComponent>,

    ){}

  ngOnInit(): void {
    this.api.obtenerProveedores().subscribe((res) => {
      this.proveedores = res;
    });
    this.actionBtn= "Guardar"
    this.titulo= "Crear"
    this.proveedorForm = this.formBuilder.group({
      nombreProveedor:['', Validators.required],
      direccion:['', Validators.required],
      correoElectronico:['', Validators.required],
      numeroDeTelefono:['', Validators.required],
    })
    if (this.editData) {
      
      this.titulo="Editar"
      this.actionBtn= "Actualizar"
      this.proveedorForm.controls['nombreProveedor'].setValue(this.editData.nombreProveedor)
      this.proveedorForm.controls['direccion'].setValue(this.editData.direccion)
      this.proveedorForm.controls['correoElectronico'].setValue(this.editData.correoElectronico)
      this.proveedorForm.controls['numeroDeTelefono'].setValue(this.editData.numeroDeTelefono)
    }
    
  }

  agregarProveedor() {
      if (!this.editData) {
        if (this.proveedorForm.valid) {
          this.api.crearProveedor(this.proveedorForm.value).subscribe({
            next: (res)=>{
              console.log(res);
              this.proveedorForm.reset();
              this.dialogRef.close('guardado');
            },
            error:()=>{
              alert("No se pudo guardar la proveedor");
            }
          })
        }
      }else{
        this.actualizarProveedor()
      }
  }
  
  actualizarProveedor(){
    this.api.editarProveedor(this.proveedorForm.value, this.editData.idProveedor)
    .subscribe({
      next:(res)=>{  
        this.proveedorForm.reset();
        this.dialogRef.close("actualizado");
      },
      error:()=>{
        alert("No se pudo actualizar proveedor")
      }
    })
  }
  
  

}

