import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) { }


    crearComentario(data: any) {
      return this.http.post<any>("http://localhost:9098/comentarios/crear", data);
      
    }
      obtenerProductos() {
        const url = 'http://localhost:9098/productos/listar';
        return this.http.get<any>(url);
      }

      obtenerUsuarios() {
        const url = 'http://localhost:9098/usuarios/listar';
        return this.http.get<any>(url);
      }
      
      obtenerComentarios() {
        const url = 'http://localhost:9098/comentarios/listar';
        return this.http.get<any>(url);
      }


      editarComentario(producto: any) {
        return this.http.put<any>("http://localhost:9098/comentarios/editar", producto);
      }
      eliminarComentario(id: number) {
        return this.http.delete<any>("http://localhost:9098/comentarios/eliminar/"+id);
      }
    



      
 

}
