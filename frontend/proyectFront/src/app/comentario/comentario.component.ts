import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { CustomPaginatorIntl } from './CustomPaginatorIntl/CustomPaginatorIntl.component';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class ComentarioComponent implements OnInit {

  displayedColumns: string[] = ['idComentario', 'producto', 'usuario', 'comentario', 'fechaDeComentario', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  selectedComentarioId: number | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table') table!: MatTable<any>;

  constructor(private dialog: MatDialog, private api: ApiService, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  }
  ngOnInit(): void {
    this.obtenerTodosComentarios();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%',
    }).afterClosed().subscribe(val => {
      if (val === 'guardado') {
        this.obtenerTodosComentarios();
      }
    });
  }

  obtenerTodosComentarios(idComentario?: number) {
    this.api.obtenerComentarios().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
        if (idComentario) {
          this.selectedComentarioId = idComentario;
        }
      },
      error: (err) => {
        alert('Error al obtener los registros');
      }
    });
  }

  editarComentario(row: any) {
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'actualizado') {
        this.obtenerTodosComentarios();
      }
    });
  }

  eliminarComentario(id: number) {
    this.api.eliminarComentario(id).subscribe({
      next: (res) => {
        this.dataSource.data = this.dataSource.data.filter(item => item.idComentario !== id);
        console.log('Comentario eliminado:', id);
        console.log('Datos de la tabla actualizados:', this.dataSource.data);
        this.obtenerTodosComentarios();
      },
      error: (error) => {
        console.error('Error al eliminar el comentario:', error);
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
