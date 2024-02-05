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
  selector: 'app-empleados-departamentos',
  templateUrl: './empleados-departamentos.component.html',
  styleUrls: ['./empleados-departamentos.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class EmpleadosDepartamentosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'empleado', 'departamento', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  selectedEmpleadoDepartamentoId: number | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table') table!: MatTable<any>;

  constructor(private dialog: MatDialog, private api: ApiService, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  }

  ngOnInit(): void {
    this.obtenerTodosEmpleadosDepartamentos();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val => {
      if (val === 'guardado') {
        this.obtenerTodosEmpleadosDepartamentos();
      }
    });
  }

  obtenerTodosEmpleadosDepartamentos(idEmpleadoDepartamento?: number) {
    this.api.obtenerEmpleadosDepartamentos().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
        if (idEmpleadoDepartamento) {
          this.selectedEmpleadoDepartamentoId = idEmpleadoDepartamento;
        }
      },
      error: (err) => {
        alert('Error al obtener los registros');
      }
    });
  }

  editarEmpleadoDepartamento(row: any) {
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'actualizado') {
        this.obtenerTodosEmpleadosDepartamentos();
      }
    });
  }

  eliminarEmpleadoDepartamento(id: number) {
    this.api.eliminarEmpleadosDepartamentos(id).subscribe({
      next: (res) => {
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
        console.log('EmpleadoDepartamento eliminado:', id);
        console.log('Datos de la tabla actualizados:', this.dataSource.data);
        this.obtenerTodosEmpleadosDepartamentos();
      },
      error: (error) => {
        console.error('Error al eliminar el EmpleadoDepartamento:', error);
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