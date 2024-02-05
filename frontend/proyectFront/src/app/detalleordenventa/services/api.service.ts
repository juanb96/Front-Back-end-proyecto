import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) { }


    crearDetalleOrdenVenta(data: any) {
      return this.http.post<any>("http://localhost:9098/detallesDeOrdenDeVenta/crear", data);
      
    }
      obtenerProductos() {
        const url = 'http://localhost:9098/productos/listar';
        return this.http.get<any>(url);
      }

      obtenerOrdenesdeVenta() {
        const url = 'http://localhost:9098/ordenesdeventa/listar';
        return this.http.get<any>(url);
      }
      
      obtenerDetalleOrdenVenta() {
        const url = 'http://localhost:9098/detallesDeOrdenDeVenta/listar';
        return this.http.get<any>(url);
      }
      
      editarDetalleOrdenVenta(detalleVenta: any) {
        return this.http.put<any>("http://localhost:9098/detallesDeOrdenDeVenta/editar", detalleVenta);
      }
      eliminarDetalleOrdenVenta(id: number) {
        return this.http.delete<any>("http://localhost:9098/detallesDeOrdenDeVenta/eliminar/"+id);
      } 
 

}
