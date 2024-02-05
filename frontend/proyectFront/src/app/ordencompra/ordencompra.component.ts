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
  selector: 'app-ordencompra',
  templateUrl: './ordencompra.component.html',
  styleUrls: ['./ordencompra.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class OrdencompraComponent implements OnInit {

  displayedColumns: string[] = ['idOrdenCompra', 'fechaDeOrden', 'proveedor', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  selectedOrdenCompraId: number | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table') table!: MatTable<any>;

  constructor(private dialog: MatDialog, private api: ApiService, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  }
  ngOnInit(): void {
    this.obtenerOrdenesCompra();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '37%'
    }).afterClosed().subscribe(val => {
      if (val === 'guardado') {
        this.obtenerOrdenesCompra();
      }
    });
  }

  obtenerOrdenesCompra(idOrdenCompra?: number) {
    this.api.obtenerOrdenesdeCompras().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);

        if (idOrdenCompra) {
          this.selectedOrdenCompraId = idOrdenCompra;
        }
      },
      error: (err) => {
        alert('Error al obtener los registros');
      }
    });
  }

  editarOrdenCompra(row: any) {
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'actualizado') {
        this.obtenerOrdenesCompra();
      }
    });
  }

  eliminarOrdenCompra(id: number) {
    this.api.eliminarOrdendeCompra(id).subscribe({
      next: (res) => {
        this.dataSource.data = this.dataSource.data.filter(item => item.idOrdenCompra !== id);
        console.log('Orden de compra eliminada:', id);
        console.log('Datos de la tabla actualizados:', this.dataSource.data);
        this.obtenerOrdenesCompra();
      },
      error: (error) => {
        console.error('Error al eliminar la orden de compra:', error);
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