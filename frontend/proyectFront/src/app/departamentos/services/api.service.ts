import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  crearDepartamento(data: any) {
    return this.http.post<any>("http://127.0.0.1:8000/Departamento/", data);
    
  }

  obtenerDepartamentos() {
    const url = 'http://127.0.0.1:8000/Departamento/';
    return this.http.get<any>(url);
  }
  
  editarDepartamento(data: any, id: number) {
    return this.http.put<any>("http://127.0.0.1:8000/Departamento/"+id+"/",data);
  }

  eliminarDepartamento(id:number){
    return this.http.delete<any>("http://127.0.0.1:8000/Departamento/"+id+"/");
  }
}