import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  crearCliente(data: any) {
    return this.http.post<any>("http://localhost:9098/clientes/crear", data);
    
  }

  obtenerClientes() {
    const url = 'http://localhost:9098/clientes/listar';
    return this.http.get<any>(url);
  }
  
  editarCliente(cliente: any) {
  return this.http.put<any>("http://localhost:9098/clientes/editar",cliente);
}

  eliminarCliente(id:number){
    return this.http.delete<any>("http://localhost:9098/clientes/eliminar/"+id);
  }
}
