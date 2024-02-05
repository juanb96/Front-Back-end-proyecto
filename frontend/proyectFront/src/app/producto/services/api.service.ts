import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  crearProducto(data: any) {
    return this.http.post<any>("http://localhost:9098/productos/crear", data);
    
  }
  obtenerCategorias() {
    const url = 'http://localhost:9098/categoria/listar'; // Asegúrate de que la URL sea correcta
    return this.http.get<any>(url);
  }

  

  obtenerProductos() {
    const url = 'http://localhost:9098/productos/listar';
    return this.http.get<any>(url);
  }
  
  editarProducto(producto: any) {
    return this.http.put<any>("http://localhost:9098/productos/editar", producto);
  }
  
  

  eliminarProducto(id:number){
    return this.http.delete<any>("http://localhost:9098/productos/eliminar/"+id);
  }
}

