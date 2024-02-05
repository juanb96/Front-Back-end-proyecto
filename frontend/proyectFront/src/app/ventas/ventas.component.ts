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
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class VentasComponent implements OnInit {

  displayedColumns: string[] = ['idVenta', 'fechaDeVenta', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  selectedVentaId: number | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table') table!: MatTable<any>;

  constructor(private dialog: MatDialog, private api: ApiService, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  }

  ngOnInit(): void {
    this.obtenerVentas();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'guardado') {
        this.obtenerVentas();
      }
    });
  }

  obtenerVentas(idVenta?: number) {
    this.api.obtenerVentas().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);

        if (idVenta) {
          this.selectedVentaId = idVenta;
        }
      },
      error: (err) => {
        alert('Error al obtener los registros');
      }
    });
  }

  editarVenta(row: any) {
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'actualizado') {
        this.obtenerVentas();
      }
    });
  }

  eliminarVenta(id: number) {
    this.api.eliminarVenta(id).subscribe({
      next: (res) => {
        this.dataSource.data = this.dataSource.data.filter(item => item.idVenta !== id);
        console.log('Venta eliminada:', id);
        console.log('Datos de la tabla actualizados:', this.dataSource.data);
        this.obtenerVentas();
      },
      error: (error) => {
        console.error('Error al eliminar la Venta:', error);
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
