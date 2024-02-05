
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
  selector: 'app-Categoria',
  templateUrl: './Categoria.component.html',
  styleUrls: ['./Categoria.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class CategoriaComponent implements OnInit {

  title = 'frontProyect';

  displayedColumns: string[] = ['idCategoria', 'nombreCategoria',  'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table') table!: MatTable<any>;

  constructor(private dialog: MatDialog, private api: ApiService, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  }
  ngOnInit(): void {
    this.obtenerTodasCategorias();
  } 
  openDialog() {   
    this.dialog.open(DialogComponent,{
      width:'40%'
    }).afterClosed().subscribe(val=>{
      if (val==='guardado') {
        this.obtenerTodasCategorias();  
      }
    })
  }
  obtenerTodasCategorias() {
    this.api.obtenerCategorias().subscribe({
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
  
  editarCategoria(row: any){
    this.dialog.open(DialogComponent,{
      width:"40%",
      data: row
    }).afterClosed().subscribe(val=>{
      if (val==="actualizado") {
        this.obtenerTodasCategorias();
      }
    })
    
  }

  eliminarCategoria(id: number) {
    this.api.eliminarCategoria(id).subscribe({
      next: (res) => {
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
        console.log('Categoría eliminada:', id);
      console.log('Datos de la tabla actualizados:', this.dataSource.data);
      this.obtenerTodasCategorias();
      },
      
      error: (error) => {
        console.error("Error al eliminar la categoría:", error);
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
