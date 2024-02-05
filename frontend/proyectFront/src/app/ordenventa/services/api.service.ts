import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  crearOrdendeVenta(data: any) {
    return this.http.post<any>("http://localhost:9098/ordenesdeventa/crear", data);
    
  }

  obtenerClientes() {
    const url = 'http://localhost:9098/clientes/listar';
    return this.http.get<any>(url);
  }
  
  obtenerOrdenesdeVenta() {
    const url = 'http://localhost:9098/ordenesdeventa/listar';
    return this.http.get<any>(url);
  }
  
  editarOrdendeVenta(ordendeventa: any) {
  return this.http.put<any>("http://localhost:9098/ordenesdeventa/editar",ordendeventa);
}

  eliminarOrdendeVenta(id:number){
    return this.http.delete<any>("http://localhost:9098/ordenesdeventa/eliminar/"+id);
  }
}

