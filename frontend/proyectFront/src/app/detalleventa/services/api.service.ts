import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) { }


    crearDetalleVenta(data: any) {
      return this.http.post<any>("http://localhost:9098/detallesventa/crear", data);
      
    }
      obtenerProductos() {
        const url = 'http://localhost:9098/productos/listar';
        return this.http.get<any>(url);
      }

      obtenerVentas() {
        const url = 'http://localhost:9098/ventas/listar';
        return this.http.get<any>(url);
      }
      
      obtenerDetalleVentas() {
        const url = 'http://localhost:9098/detallesventa/listar';
        return this.http.get<any>(url);
      }
      
      editarDetalleVenta(detalleVenta: any) {
        return this.http.put<any>("http://localhost:9098/detallesventa/editar", detalleVenta);
      }
      eliminarDetalleVenta(id: number) {
        return this.http.delete<any>("http://localhost:9098/detallesventa/eliminar/"+id);
      } 
 

}
