import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  crearProveedor(data: any) {
    return this.http.post<any>("http://localhost:9098/proveedores/crear", data);
    
  }

  obtenerProveedores() {
    const url = 'http://localhost:9098/proveedores/listar';
    return this.http.get<any>(url);
  }
  
  editarProveedor(data: any, id: number) {
  return this.http.put<any>("http://localhost:9098/proveedores/editar/"+id,data);
}

  eliminarProveedor(id:number){
    return this.http.delete<any>("http://localhost:9098/proveedores/eliminar/"+id);
  }
}

