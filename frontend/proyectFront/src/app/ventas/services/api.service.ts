import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  crearVenta(data: any) {
    return this.http.post<any>("http://localhost:9098/ventas/crear", data);
    
  }

  obtenerVentas() {
    const url = 'http://localhost:9098/ventas/listar';
    return this.http.get<any>(url);
  }
  
  editarVenta(venta: any) {
  return this.http.put<any>("http://localhost:9098/ventas/editar",venta);
}

  eliminarVenta(id:number){
    return this.http.delete<any>("http://localhost:9098/ventas/eliminar/"+id);
  }
}
