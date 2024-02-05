import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) { }

    obtenerEmpleados() {
      const url = 'http://127.0.0.1:8000/Empleados/';
      return this.http.get<any>(url);
    }

    obtenerDepartamentos() {
      const url = 'http://127.0.0.1:8000/Departamento/';
      return this.http.get<any>(url);
    }

      crearEmpleadosDepartamentos(data: any) {
        return this.http.post<any>("http://127.0.0.1:8000/EmpleadosDepartamento/", data);
        
      }
      
      editarEmpleadosDepartamentos(data: any, id: number) {
        return this.http.put<any>("http://127.0.0.1:8000/EmpleadosDepartamento/"+id+"/",data);
      }

      eliminarEmpleadosDepartamentos(id:number){
        return this.http.delete<any>("http://127.0.0.1:8000/EmpleadosDepartamento/"+id+"/");
      }
      
      obtenerEmpleadosDepartamentos() {
        const url = 'http://127.0.0.1:8000/EmpleadosDepartamento/';
        return this.http.get<any>(url);
      }

}
