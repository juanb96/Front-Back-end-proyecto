import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  crearEmpleado(data: any) {
    return this.http.post<any>("http://127.0.0.1:8000/Empleado/",data);
    
  }

  obtenerEmpleados() {
    const url = 'http://127.0.0.1:8000/Empleados/';
    return this.http.get<any>(url);
  }
  
  editarEmpleado(data: any, id: number) {
  return this.http.put<any>("http://127.0.0.1:8000/Empleados/"+id+"/",data);
}

  eliminarEmpleado(id:number){
    return this.http.delete<any>("http://127.0.0.1:8000/Empleados/"+id+"/");
  }
}
