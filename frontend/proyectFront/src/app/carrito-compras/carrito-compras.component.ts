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
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css'],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class CarritoComprasComponent implements OnInit {

  displayedColumns: string[] = ['idCarrito', 'usuario','fechaDeCreacion','acciones'];
  dataSource!: MatTableDataSource<any>;

  selectCarritoComprasId: number | undefined;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table') table!: MatTable<any>;

  constructor(private dialog: MatDialog, private api: ApiService, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  }

  ngOnInit(): void{
    this.obtenerTodosCarritosCompras();
  }
  openDialog() {   
    this.dialog.open(DialogComponent,{
      width:'37%'
    }).afterClosed().subscribe(val=>{
      if (val==='guardado') {
        this.obtenerTodosCarritosCompras();  
      }
    })
  }

  obtenerTodosCarritosCompras(idCarrito?: number) {
    this.api.obtenerCarritosCompras().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
  
        if (idCarrito) {
          this.selectCarritoComprasId = idCarrito;
        }
      },
      error: (err) => {
        alert("Error al obtener los registros");
      }
    });
  }
  
  editarCarritoDeCompras(row: any){
    this.dialog.open(DialogComponent,{
      width:"40%",
      data: row
    }).afterClosed().subscribe(val=>{
      if (val==="actualizado") {
        this.obtenerTodosCarritosCompras();
      }
    })
    
  }

  eliminarCarritoDeCompras(id: number) {
    this.api.eliminarCarritoCompra(id).subscribe({
      next: (res) => {
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
        console.log('imagen eliminado:', id);
      console.log('Datos de la tabla actualizados:', this.dataSource.data);
      this.obtenerTodosCarritosCompras();
      },
      error: (error) => {
        console.error("Error al eliminar el carrito:", error);
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
