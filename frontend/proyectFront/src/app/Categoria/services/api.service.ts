import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  crearCategoria(data: any) {
    return this.http.post<any>("http://localhost:9098/categoria/crear", data);
    
  }

  obtenerCategorias() {
    const url = 'http://localhost:9098/categoria/listar';
    return this.http.get<any>(url);
  }
  
  editarCategoria(data: any, id: number) {
  return this.http.put<any>("http://localhost:9098/categoria/editar/"+id,data);
}

  eliminarCategoria(id:number){
    return this.http.delete<any>("http://localhost:9098/categoria/eliminar/"+id);
  }
}
