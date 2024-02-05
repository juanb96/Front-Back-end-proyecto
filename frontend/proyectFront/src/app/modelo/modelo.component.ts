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
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class ModeloComponent implements OnInit {

  displayedColumns: string[] = ['idModelo', 'nombreModelo', 'marca', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  selectedModeloId: number | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table') table!: MatTable<any>;

  constructor(private dialog: MatDialog, private api: ApiService, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  }

  ngOnInit(): void {
    this.obtenerModelos();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '39%'
    }).afterClosed().subscribe(val => {
      if (val === 'guardado') {
        this.obtenerModelos();
      }
    });
  }

  obtenerModelos(idModelo?: number) {
    this.api.obtenerModelos().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);

        if (idModelo) {
          this.selectedModeloId = idModelo;
        }
      },
      error: (err) => {
        alert('Error al obtener los registros');
      }
    });
  }

  editarModelo(row: any) {
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'actualizado') {
        this.obtenerModelos();
      }
    });
  }

  eliminarModelo(id: number) {
    this.api.eliminarModelo(id).subscribe({
      next: (res) => {
        this.dataSource.data = this.dataSource.data.filter(item => item.idModelo !== id);
        console.log('Modelo eliminado:', id);
        console.log('Datos de la tabla actualizados:', this.dataSource.data);
        this.obtenerModelos();
      },
      error: (error) => {
        console.error('Error al eliminar el modelo:', error);
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
