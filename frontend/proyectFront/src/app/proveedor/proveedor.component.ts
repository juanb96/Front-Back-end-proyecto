import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component'; 
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from './CustomPaginatorIntl/CustomPaginatorIntl.component';
@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class ProveedorComponent implements OnInit {

  displayedColumns: string[] = ['idProveedor', 'nombreProveedor','direccion','correoElectronico','numeroDeTelefono',  'acciones'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table') table!: MatTable<any>;

  constructor(private dialog: MatDialog, private api: ApiService, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  }

  ngOnInit(): void {
    this.obtenerTodosProveedores();
  } 

  openDialog() {   
    this.dialog.open(DialogComponent,{
      width:'40%'
    }).afterClosed().subscribe(val=>{
      if (val==='guardado') {
        this.obtenerTodosProveedores();  
      }
    })
  }

  obtenerTodosProveedores() {
    this.api.obtenerProveedores().subscribe({
      next: (res) => {
        this.dataSource= new MatTableDataSource(res);
        this.dataSource.paginator= this.paginator;
        this.dataSource.sort= this.sort;
      },
      error: (err) => {
        alert("Error al obtener los registros");
      }
    });
  }
  editarProveedor(row: any){
    this.dialog.open(DialogComponent,{
      width:"40%",
      data: row
    }).afterClosed().subscribe(val=>{
      if (val==="actualizado") {
        this.obtenerTodosProveedores();
      }
    })
  }

  eliminarProveedor(id: number) {
    this.api.eliminarProveedor(id).subscribe({
      next: (res) => {
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
        console.log('Proveedor eliminado:', id);
      console.log('Datos de la tabla actualizados:', this.dataSource.data);
      this.obtenerTodosProveedores();
      },
      
      error: (error) => {
        console.error("Error al eliminar el Proveedor:", error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
