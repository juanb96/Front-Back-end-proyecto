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
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class MarcaComponent implements OnInit {

  displayedColumns: string[] = ['idMarca', 'nombreMarca', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  selectedMarcaId: number | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table') table!: MatTable<any>;

  constructor(private dialog: MatDialog, private api: ApiService, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  }

  ngOnInit(): void {
    this.obtenerMarcas();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '35%'
    }).afterClosed().subscribe(val => {
      if (val === 'guardado') {
        this.obtenerMarcas();
      }
    });
  }

  obtenerMarcas(idMarca?: number) {
    this.api.obtenerMarcas().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);

        if (idMarca) {
          this.selectedMarcaId = idMarca;
        }
      },
      error: (err) => {
        alert('Error al obtener los registros');
      }
    });
  }

  editarMarca(row: any) {
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'actualizado') {
        this.obtenerMarcas();
      }
    });
  }

  eliminarMarca(id: number) {
    this.api.eliminarMarca(id).subscribe({
      next: (res) => {
        this.dataSource.data = this.dataSource.data.filter(item => item.idMarca !== id);
        console.log('Marca eliminada:', id);
        console.log('Datos de la tabla actualizados:', this.dataSource.data);
        this.obtenerMarcas();
      },
      error: (error) => {
        console.error('Error al eliminar la Marca:', error);
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
