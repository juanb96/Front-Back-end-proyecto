import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }

    crearCarritoCompras(data: any) {
      return this.http.post<any>("http://localhost:9098/carritos-compras/crear", data);
      
    }
    
    obtenerUsuarios() {
      const url = 'http://localhost:9098/usuarios/listar'; // Asegúrate de que la URL sea correcta
      return this.http.get<any>(url);
    }
  
    
  
    obtenerCarritosCompras() {
      const url = 'http://localhost:9098/carritos-compras/listar';
      return this.http.get<any>(url);
    }
    
    editarCarritoCompra(producto: any) {
      return this.http.put<any>("http://localhost:9098/carritos-compras/editar", producto);
    }
    
    
  
    eliminarCarritoCompra(id:number){
      return this.http.delete<any>("http://localhost:9098/carritos-compras/eliminar/"+id);
    }
  }
  
  