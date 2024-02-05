import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CustomPaginatorIntl } from './CustomPaginatorIntl/CustomPaginatorIntl.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
@Component({
  selector: 'app-detalleventa',
  templateUrl: './detalleventa.component.html',
  styleUrls: ['./detalleventa.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class DetalleventaComponent implements OnInit {

  displayedColumns: string[] = ['idDetalleVenta', 'venta', 'producto', 'cantidad', 'precioUnitario', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  selectedDetalleVentaId: number | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table') table!: MatTable<any>;

  constructor(private dialog: MatDialog, private api: ApiService, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  }
  ngOnInit(): void {
    this.obtenerTodosDetalleVentas();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '38%',
    }).afterClosed().subscribe(val => {
      if (val === 'guardado') {
        this.obtenerTodosDetalleVentas();
      }
    });
  }

  obtenerTodosDetalleVentas(idDetalleVenta?: number) {
    this.api.obtenerDetalleVentas().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
        if (idDetalleVenta) {
          this.selectedDetalleVentaId = idDetalleVenta;
        }
      },
      error: (err) => {
        alert('Error al obtener los registros');
      }
    });
  }

  editarDetalleVenta(row: any) {
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'actualizado') {
        this.obtenerTodosDetalleVentas();
      }
    });
  }

  eliminarDetalleVenta(id: number) {
    this.api.eliminarDetalleVenta(id).subscribe({
      next: (res) => {
        this.dataSource.data = this.dataSource.data.filter(item => item.idDetalleVenta !== id);
        console.log('Detalle de Venta eliminado:', id);
        console.log('Datos de la tabla actualizados:', this.dataSource.data);
        this.obtenerTodosDetalleVentas();
      },
      error: (error) => {
        console.error('Error al eliminar el detalle de venta:', error);
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