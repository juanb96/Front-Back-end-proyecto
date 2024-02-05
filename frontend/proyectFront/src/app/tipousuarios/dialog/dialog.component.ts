import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup,FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  tipousuariosForm !: FormGroup;
  actionBtn: string="guardar"
  id: string=""
  titulo: string="Edita"
  tipousuarios: any[] = [];
  disableSelect = new FormControl(false);



  
  constructor(private formBuilder: FormBuilder, 
      private api:ApiService, 

      @Inject(MAT_DIALOG_DATA) public editData: any,
      private dialogRef : MatDialogRef<DialogComponent>,

    ){}


    ngOnInit(): void {
        
      this.api.obtenerTiposUsuarios().subscribe((res) => { // Agrega esta línea
        this.tipousuarios = res;
      });
  
    this.actionBtn= "Guardar"
    this.titulo= "Crear"
    this.tipousuariosForm = this.formBuilder.group({
      nombreTipoUsuario:['', Validators.required],
    })
    if (this.editData) {
      this.titulo="Editar"
      this.id="ID: "
      this.actionBtn= "Actualizar"
      this.tipousuariosForm.controls['nombreTipoUsuario'].setValue(this.editData.nombreTipoUsuario)
    }
    
  }
  agregarTipoUsuario() {
    if (this.tipousuariosForm.valid) {
      const tipousuariosFormValue = { ...this.tipousuariosForm.value };
      if (this.editData) {
        this.actualizarTipoUsuario();
      }else{
        this.crearTipoUsuario(tipousuariosFormValue);
      }
    }
  }

  crearTipoUsuario(tipoUsuario : any) {
    this.api.crearTipoUsuario(tipoUsuario).subscribe({
      next: (res) => {
        console.log(res);
        this.tipousuariosForm.reset();
        this.dialogRef.close('guardado');
      },
      error: () => {
        alert("No se pudo guardar el producto");
      }
    });
  }
  

  actualizarTipoUsuario() {
    if (this.tipousuariosForm.valid) {
      const tipousuariosFormValue = { ...this.tipousuariosForm.value };
      tipousuariosFormValue.idTipoUsuario = this.editData.idTipoUsuario; // Corregir el nombre de la propiedad
      this.api.editarTipoUsuario(tipousuariosFormValue)
        .subscribe(
          (res) => {  
            this.tipousuariosForm.reset();
            this.dialogRef.close("actualizado");
          },
          (error) => {
            alert("No se pudo actualizar el tipo de usuario");
          }
        );
    }
  }
}

  

 
  
 
  
  


