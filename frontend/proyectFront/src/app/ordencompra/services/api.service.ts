import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  crearOrdendeCompra(data: any) {
    return this.http.post<any>("http://localhost:9098/ordendecompra/crear", data);
    
  }

  obtenerProveedores() {
    const url = 'http://localhost:9098/proveedores/listar';
    return this.http.get<any>(url);
  }
  
  obtenerOrdenesdeCompras() {
    const url = 'http://localhost:9098/ordendecompra/listar';
    return this.http.get<any>(url);
  }
  
  editarOrdendeCompra(ordendeCompra: any) {
  return this.http.put<any>("http://localhost:9098/ordendecompra/editar",ordendeCompra);
}

  eliminarOrdendeCompra(id:number){
    return this.http.delete<any>("http://localhost:9098/ordendecompra/eliminar/"+id);
  }
}

