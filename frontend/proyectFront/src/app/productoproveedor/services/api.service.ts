import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) { }

    obtenerProveedores() {
        const url = 'http://localhost:9098/proveedores/listar';
        return this.http.get<any>(url);
      }

      obtenerProductos() {
        const url = 'http://localhost:9098/productos/listar';
        return this.http.get<any>(url);
      }

      crearProductoProveedor(data: any) {
        return this.http.post<any>("http://localhost:9098/proveedor-producto/crear", data);
        
      }
      
      editarProductoProveedor(productoproveedor: any) {
        return this.http.put<any>("http://localhost:9098/proveedor-producto/editar", productoproveedor);
      }

      eliminarProductoProveedor(id:number){
        return this.http.delete<any>("http://localhost:9098/proveedor-producto/eliminar/"+id);
      }
      
      obtenerProductosProveedores() {
        const url = 'http://localhost:9098/proveedor-producto/listar';
        return this.http.get<any>(url);
      }

}
