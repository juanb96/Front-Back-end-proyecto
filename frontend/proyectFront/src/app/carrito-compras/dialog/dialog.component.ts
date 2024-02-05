import { Component, OnInit, Inject, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, AfterViewInit {

  carritoForm!: FormGroup;
  actionBtn: string = "guardar";
  titulo: string = "Editar";
  carritos : any []=[];
  usuarios: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.api.obtenerUsuarios().subscribe((res) => {
      this.usuarios = res;
    });

    this.api.obtenerCarritosCompras().subscribe((res)=>{
      this.carritos=res
    })

    this.actionBtn = "Guardar";
    this.titulo = "Crear";
    this.carritoForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      fechaDeCreacion: ['', Validators.required]
    });

    if (this.editData) {
      this.titulo = "Editar";
      this.actionBtn = "Actualizar";
      this.carritoForm.controls['fechaDeCreacion'].setValue(this.editData.fechaDeCreacion);
      this.carritoForm.controls['usuario'].setValue(this.editData.usuario.idUsuario);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  agregarCarrito() {
    if (this.carritoForm.valid) {
      const carritoFormValue = { ...this.carritoForm.value };
      carritoFormValue.usuario={idUsuario: carritoFormValue.usuario}
      if (this.editData) {
        this.actualizarCarrito();
      } else {
        this.crearCarrito(carritoFormValue);
      }
    }
  }

  crearCarrito(carrito: any) {
    this.api.crearCarritoCompras(carrito).subscribe({
      next: (res) => {
        console.log(res);

        this.carritoForm.reset();
        this.dialogRef.close('guardado');
      },
      error: () => {
        alert("No se pudo guardar el carrito de compras");
      }
    });
  }

  actualizarCarrito() {
    if (this.carritoForm.valid) {
      const carritoFormValue = { ...this.carritoForm.value };
      carritoFormValue.idCarrito = this.editData.idCarrito; // Agregar el ID del carrito al objeto del formulario
      carritoFormValue.usuario= {idUsuario:carritoFormValue.usuario}

      this.api.editarCarritoCompra(carritoFormValue)
        .subscribe(
          (res) => {
            this.carritoForm.reset();
            this.dialogRef.close("actualizado");
          },
          (error) => {
            alert("No se pudo actualizar el carrito de compras");
          }
        );
    }
  }
}
