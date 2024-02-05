import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }

    crearImagen(data: any) {
      return this.http.post<any>("http://localhost:9098/imagen/crear", data);
      
    }
    obtenerProductos() {
      const url = 'http://localhost:9098/productos/listar'; // Asegúrate de que la URL sea correcta
      return this.http.get<any>(url);
    }
  
    
  
    obtenerImagenes() {
      const url = 'http://localhost:9098/imagen/listar';
      return this.http.get<any>(url);
    }
    
    editarImagen(producto: any) {
      return this.http.put<any>("http://localhost:9098/imagen/editar", producto);
    }
    
    
  
    eliminarImagen(id:number){
      return this.http.delete<any>("http://localhost:9098/imagen/eliminar/"+id);
    }
  }
  
  