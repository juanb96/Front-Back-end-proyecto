import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  crearMarca(data: any) {
    return this.http.post<any>("http://localhost:9094/marca/crear", data);
    
  }

  obtenerMarcas() {
    const url = 'http://localhost:9094/marca/listar';
    return this.http.get<any>(url);
  }
  
  editarMarca(marca: any) {
  return this.http.put<any>("http://localhost:9094/marca/editar",marca);
}

  eliminarMarca(id:number){
    return this.http.delete<any>("http://localhost:9094/marca/eliminar/"+id);
  }
}
