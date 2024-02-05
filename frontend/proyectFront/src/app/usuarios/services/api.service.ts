import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }

    crearUsuario(data: any) {
      return this.http.post<any>("http://localhost:9098/usuarios/crear", data);
      
    }
    
    obtenerTiposUsuario() {
      const url = 'http://localhost:9098/tipo-usuarios/listar'; // Asegúrate de que la URL sea correcta
      return this.http.get<any>(url);
    }
  
    
  
    obtenerUsuarios() {
      const url = 'http://localhost:9098/usuarios/listar';
      return this.http.get<any>(url);
    }
    
    editarUsuario(producto: any) {
      return this.http.put<any>("http://localhost:9098/usuarios/editar", producto);
    }
    
    
  
    eliminarUsuarios(id:number){
      return this.http.delete<any>("http://localhost:9098/usuarios/eliminar/"+id);
    }

    
  }
  
  