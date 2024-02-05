import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  crearCargo(data: any) {
    return this.http.post<any>("http://127.0.0.1:8000/Cargo/", data);
    
  }

  obtenerCargos() {
    const url = 'http://127.0.0.1:8000/Cargo/';
    return this.http.get<any>(url);
  }
  
  editarCargo(data: any, id: number) {
    return this.http.put<any>("http://127.0.0.1:8000/Cargo/"+id+"/",data);
  }

  eliminarCargo(id:number){
    return this.http.delete<any>("http://127.0.0.1:8000/Cargo/"+id+"/");
  }
}