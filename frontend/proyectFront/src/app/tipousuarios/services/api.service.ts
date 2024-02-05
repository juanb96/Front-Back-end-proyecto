import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  crearTipoUsuario(data: any) {
    return this.http.post<any>("http://localhost:9098/tipo-usuarios/crear", data);
    
  }

  obtenerTiposUsuarios() {
    const url = 'http://localhost:9098/tipo-usuarios/listar';
    return this.http.get<any>(url);
  }
  
  editarTipoUsuario(tipousuario: any) {
  return this.http.put<any>("http://localhost:9098/tipo-usuarios/editar",tipousuario);
}

  eliminarTipoUsuario(id:number){
    return this.http.delete<any>("http://localhost:9098/tipo-usuarios/eliminar/"+id);
  }
}
