import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  crearModelo(data: any) {
    return this.http.post<any>("http://localhost:9094/modelo/crear", data);
    
  }

  obtenerModelos() {
    const url = 'http://localhost:9094/modelo/listar';
    return this.http.get<any>(url);
  }
  
  obtenerMarcas() {
    const url = 'http://localhost:9094/marca/listar';
    return this.http.get<any>(url);
  }
  
  editarModelo(modelo: any) {
  return this.http.put<any>("http://localhost:9094/modelo/editar",modelo);
}

  eliminarModelo(id:number){
    return this.http.delete<any>("http://localhost:9094/modelo/eliminar/"+id);
  }
}
