import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from './CustomPaginatorIntl/CustomPaginatorIntl.component';
@Component({
  selector: 'app-detalleordencompra',
  templateUrl: './detalleordencompra.component.html',
  styleUrls: ['./detalleordencompra.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class DetalleordencompraComponent implements OnInit {

  displayedColumns: string[] = ['idDetalleOrdenCompra', 'ordenDeCompra', 'producto', 'cantidad', 'precioUnitario', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  selectedDetalleOrdenCompraId: number | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table') table!: MatTable<any>;

  constructor(private dialog: MatDialog, private api: ApiService, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  }

  ngOnInit(): void {
    this.obtenerTodosDetalleOrdenCompra();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '38%',
    }).afterClosed().subscribe(val => {
      if (val === 'guardado') {
        this.obtenerTodosDetalleOrdenCompra();
      }
    });
  }

  obtenerTodosDetalleOrdenCompra(idDetalleOrdenCompra?: number) {
    this.api.obtenerDetallesOrdenCompra().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
        if (idDetalleOrdenCompra) {
          this.selectedDetalleOrdenCompraId = idDetalleOrdenCompra;
        }
      },
      error: (err) => {
        alert('Error al obtener los registros');
      }
    });
  }

  editarDetalleOrdenCompra(row: any) {
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'actualizado') {
        this.obtenerTodosDetalleOrdenCompra();
      }
    });
  }

  eliminarDetalleOrdenCompra(id: number) {
    this.api.eliminarDetallesOrdenCompra(id).subscribe({
      next: (res) => {
        this.dataSource.data = this.dataSource.data.filter(item => item.idDetalleOrdenCompra !== id);
        console.log('Detalle de Compra eliminado:', id);
        console.log('Datos de la tabla actualizados:', this.dataSource.data);
        this.obtenerTodosDetalleOrdenCompra();
      },
      error: (error) => {
        console.error('Error al eliminar el detalle de compra:', error);
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