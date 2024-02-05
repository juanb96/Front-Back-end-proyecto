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

  empleadoForm!: FormGroup;
  actionBtn: string = "guardar";
  id: string = "";
  titulo: string = "Editar";
  empleados: any[]=[];
  disableSelect = new FormControl(false); 

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
  ) { }

  ngOnInit(): void {    
    this.api.obtenerEmpleados().subscribe((res) => {
      this.empleados = res;
    });
    this.actionBtn = "Guardar";
    this.titulo = "Crear";
    this.empleadoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salario: ['', Validators.required]
    });

    if (this.editData) {
      this.titulo = "Editar";
      this.id= "ID: ";
      this.actionBtn = "Actualizar";
      this.empleadoForm.patchValue(this.editData);
    }
  }


  agregarEmpleado() {
    if (!this.editData) {
      if (this.empleadoForm.valid) {
        this.api.crearEmpleado(this.empleadoForm.value).subscribe({
          next: (res)=>{
            this.empleadoForm.reset();
            this.dialogRef.close('guardado');
          },
          error:()=>{
            alert("No se pudo guardar la categoria");
          }
        })
      }
    }else{
      this.actualizarEmpleado()
    }
}

  actualizarEmpleado(){
    this.api.editarEmpleado(this.empleadoForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{  
        this.empleadoForm.reset();
        this.dialogRef.close("actualizado");
      },
      error:()=>{
        alert("No se pudo actualizar empleado")
      }
    })
  }
}
