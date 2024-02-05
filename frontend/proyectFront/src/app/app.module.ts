import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaModule } from './Categoria/Categoria.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ProveedorModule } from './proveedor/proveedor.module';
import { ProductoModule } from './producto/producto.module';
import { ImagenModule } from './imagen/imagen.module';
import { ProductoproveedorModule } from './productoproveedor/productoproveedor.module';
import { TipousuariosModule } from './tipousuarios/tipousuarios.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CarritoComprasModule } from './carrito-compras/carrito-compras.module';
import { ComentarioModule } from './comentario/comentario.module';
import { MarcaModule } from './marca/marca.module';
import { ModeloModule } from './modelo/modelo.module';
import { VentasModule } from './ventas/ventas.module';
import { ClientesModule } from './clientes/clientes.module';
import { OrdenventaModule } from './ordenventa/ordenventa.module';
import { DetalleventaModule } from './detalleventa/detalleventa.module';

import { DetalleordenventaModule } from './detalleordenventa/detalleordenventa.module';
import { OrdencompraModule } from './ordencompra/ordencompra.module';
import { DetalleordencompraModule } from './detalleordencompra/detalleordencompra.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { CargosModule } from './cargos/cargos.module';
import { EmpleadosDepartamentosModule } from './empleados-departamentos/empleados-departamentos.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    EmpleadosDepartamentosModule,
    CargosModule,
    DepartamentosModule,
    EmpleadosModule,
    MatButtonModule,
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    CategoriaModule,
    NoopAnimationsModule,
    MatToolbarModule,
MatIconModule,
ProveedorModule,
ProductoModule,
ImagenModule,
ProductoproveedorModule,
TipousuariosModule,
UsuariosModule,
CarritoComprasModule,
ComentarioModule,
MarcaModule,
ModeloModule,
VentasModule,
ClientesModule,
OrdenventaModule,
DetalleventaModule,
DetalleordenventaModule,
OrdencompraModule,
DetalleordencompraModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
