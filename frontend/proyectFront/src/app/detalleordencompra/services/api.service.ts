import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) { }


    crearDetallesOrdenCompra(data: any) {
      return this.http.post<any>("http://localhost:9098/detalledeordendecompra/crear", data);
      
    }
      obtenerProductos() {
        const url = 'http://localhost:9098/productos/listar';
        return this.http.get<any>(url);
      }

      obtenerOrdenesdeCompra() {
        const url = 'http://localhost:9098/ordendecompra/listar';
        return this.http.get<any>(url);
      }
      
      obtenerDetallesOrdenCompra() {
        const url = 'http://localhost:9098/detalledeordendecompra/listar';
        return this.http.get<any>(url);
      }
      
      editarDetallesOrdenCompra(detalleCompra: any) {
        return this.http.put<any>("http://localhost:9098/detalledeordendecompra/editar", detalleCompra);
      }
      eliminarDetallesOrdenCompra(id: number) {
        return this.http.delete<any>("http://localhost:9098/detalledeordendecompra/eliminar/"+id);
      } 
 

}
