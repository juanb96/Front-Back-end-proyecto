import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './Categoria/Categoria.component';
import { BlankComponent } from './blank.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ProductoComponent } from './producto/producto.component';
import { ImagenComponent } from './imagen/imagen.component';
import { ProductoproveedorComponent } from './productoproveedor/productoproveedor.component';
import { TipousuariosComponent } from './tipousuarios/tipousuarios.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { MarcaComponent } from './marca/marca.component';
import { ModeloComponent } from './modelo/modelo.component';
import { VentasComponent } from './ventas/ventas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { OrdenventaComponent } from './ordenventa/ordenventa.component';
import { DetalleventaComponent } from './detalleventa/detalleventa.component';
import { DetalleordenventaComponent } from './detalleordenventa/detalleordenventa.component';
import { OrdencompraComponent } from './ordencompra/ordencompra.component';
import { DetalleordencompraComponent } from './detalleordencompra/detalleordencompra.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { CargosComponent } from './cargos/cargos.component';
import { EmpleadosDepartamentosComponent } from './empleados-departamentos/empleados-departamentos.component';


const routes: Routes = [
  { path: '', component: BlankComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'proveedor', component: ProveedorComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'imagen', component: ImagenComponent },
  { path: 'productoproveedor', component: ProductoproveedorComponent },
  { path: 'tipousuarios', component: TipousuariosComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'carrito-compras', component: CarritoComprasComponent },
  { path: 'comentario', component: ComentarioComponent },
  { path: 'marca', component: MarcaComponent },
  { path: 'modelo', component: ModeloComponent },
  { path: 'venta', component: VentasComponent },
  { path: 'cliente', component: ClientesComponent },
  { path: 'ordenventa', component: OrdenventaComponent },
  { path: 'detalleventa', component: DetalleventaComponent },
  { path: 'ordendetalleventa', component: DetalleordenventaComponent },
  { path: 'ordendetallecompra', component: OrdencompraComponent },
  { path: 'detalleordendetallecompra', component: DetalleordencompraComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'departamentos', component: DepartamentosComponent },
  { path: 'cargos', component: CargosComponent },
  { path: 'empleadoDepartamento', component: EmpleadosDepartamentosComponent},
  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
