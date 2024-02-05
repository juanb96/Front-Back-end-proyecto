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

  empleadoDepartamentoForm!: FormGroup;
  actionBtn: string = "guardar";
  id: string = "";
  titulo: string = "Editar";
  empleados: any[] = [];
  departamentos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
    this.api.obtenerEmpleados().subscribe((res) => {
      this.empleados = res;
    });

    this.api.obtenerDepartamentos().subscribe((res) => {
      this.departamentos = res;
    });

    this.actionBtn = "Guardar";
    this.titulo = "Crear";
    this.empleadoDepartamentoForm = this.formBuilder.group({
      empleado: ['', Validators.required],
      departamento: ['', Validators.required]
    });

    if (this.editData) {
      this.titulo = "Editar";
      this.id = "ID: " + this.editData.id;
      this.actionBtn = "Actualizar";
      this.empleadoDepartamentoForm.controls['empleado'].setValue(this.editData.id_empleado);
      this.empleadoDepartamentoForm.controls['departamento'].setValue(this.editData.id_departamento);
    }
  }

  guardarEmpleadoDepartamento() {
    if (this.empleadoDepartamentoForm.valid) {
      const empleadoDepartamentoForm = { ...this.empleadoDepartamentoForm.value };
      empleadoDepartamentoForm.id_empleado = empleadoDepartamentoForm.empleado;
      empleadoDepartamentoForm.id_departamento = empleadoDepartamentoForm.departamento;

      if (this.editData) {
        this.actualizarEmpleadoDepartamento(empleadoDepartamentoForm);
      } else {
        this.crearEmpleadoDepartamento(empleadoDepartamentoForm);
      }
    }
  }

  crearEmpleadoDepartamento(empleadoDepartamento: any) {
    this.api.crearEmpleadosDepartamentos(empleadoDepartamento).subscribe({
      next: (res) => {
        console.log(res);
        this.empleadoDepartamentoForm.reset();
        this.dialogRef.close('guardado');
      },
      error: () => {
        alert("No se pudo guardar el empleado en el departamento");
      }
    });
  }

  actualizarEmpleadoDepartamento(empleadoDepartamento: any) {
    this.api.editarEmpleadosDepartamentos(this.editData.id, empleadoDepartamento).subscribe({
      next: (res) => {
        console.log(res);
        this.empleadoDepartamentoForm.reset();
        setTimeout(() => {
          this.cdr.detectChanges();
          this.dialogRef.close("actualizado");
        });
      },
      error: () => {
        alert("No se pudo actualizar el empleado en el departamento");
      }
    });
  }
}
