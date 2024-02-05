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
  selector: 'app-productoproveedor',
  templateUrl: './productoproveedor.component.html',
  styleUrls: ['./productoproveedor.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class ProductoproveedorComponent implements OnInit {

  displayedColumns: string[] = ['idProveedorProducto', 'producto','proveedor',  'acciones'];
  dataSource!: MatTableDataSource<any>;

  selectedProductoProveedorId: number | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table') table!: MatTable<any>;


  constructor(private dialog: MatDialog, private api: ApiService, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  }
  ngOnInit(): void{
    this.obtenerTodosProductosProveedores();
  }

 
  openDialog() {   
    this.dialog.open(DialogComponent,{
      width:'40%'
    }).afterClosed().subscribe(val=>{
      if (val==='guardado') {
        this.obtenerTodosProductosProveedores();  
      }
    })
  }



  obtenerTodosProductosProveedores(idProveedorProducto?: number) {
    this.api.obtenerProductosProveedores().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
        if (idProveedorProducto) {
          this.selectedProductoProveedorId = idProveedorProducto;
        }
      },
      error: (err) => {
        alert("Error al obtener los registros");
      }
    });
  }

  editarProductoProveedor(row: any){
    this.dialog.open(DialogComponent,{
      width:"40%",
      data: row
    }).afterClosed().subscribe(val=>{
      if (val==="actualizado") {
        this.obtenerTodosProductosProveedores();
      }
    })
    
  }

  eliminarProductoProveedor(id: number) {
    this.api.eliminarProductoProveedor(id).subscribe({
      next: (res) => {
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
        console.log('productoproveedor eliminado:', id);
      console.log('Datos de la tabla actualizados:', this.dataSource.data);
      this.obtenerTodosProductosProveedores();
      },
      error: (error) => {
        console.error("Error al eliminar el productoproveedor:", error);
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
