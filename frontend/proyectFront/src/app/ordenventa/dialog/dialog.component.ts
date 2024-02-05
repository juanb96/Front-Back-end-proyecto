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

  ordenVentasForm!: FormGroup;
  actionBtn: string = "guardar";
  id: string = "";
  titulo: string = "Editar";
  clientes: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.api.obtenerClientes().subscribe((res) => {
      this.clientes = res;
    });

    this.actionBtn = "Guardar";
    this.titulo = "Crear";
    this.ordenVentasForm = this.formBuilder.group({
      fechaDeOrden: ['', Validators.required],
      cliente: ['', Validators.required]
    });

    if (this.editData) {
      this.id= "ID: "
      this.titulo = "Editar";
      this.actionBtn = "Actualizar";
      this.ordenVentasForm.controls['fechaDeOrden'].setValue(this.editData.fechaDeOrden);
      this.ordenVentasForm.controls['cliente'].setValue(this.editData.cliente.idCliente);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  agregarcliente() {
    if (this.ordenVentasForm.valid) {
      const ordenventaFormValue = { ...this.ordenVentasForm.value };
      ordenventaFormValue.cliente = { idCliente: ordenventaFormValue.cliente };

      if (this.editData) {
        this.actualizaOrdenVenta();
      } else {
        this.crearOrdenVenta(ordenventaFormValue);
      }
    }
  }

  crearOrdenVenta(ordenventa: any) {
    this.api.crearOrdendeVenta(ordenventa).subscribe({
      next: (res) => {
        console.log(res);
        this.ordenVentasForm.reset();
        this.dialogRef.close('guardado');
      },
      error: () => {
        alert("No se pudo guardar la orden");
      }
    });
  }

  actualizaOrdenVenta() {
    if (this.ordenVentasForm.valid) {
      const ordenventaFormValue = { ...this.ordenVentasForm.value };
      ordenventaFormValue.idOrdenVenta = this.editData.idOrdenVenta; // Agregar el ID del modelo al objeto del formulario
      ordenventaFormValue.cliente = { idCliente: ordenventaFormValue.cliente };

      this.api.editarOrdendeVenta(ordenventaFormValue).subscribe(
        (res) => {
          this.ordenVentasForm.reset();
          this.dialogRef.close("actualizado");
        },
        (error) => {
          alert("No se pudo actualizar la orden");
        }
      );
    }
  }
}

