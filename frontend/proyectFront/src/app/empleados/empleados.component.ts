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
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class EmpleadosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'fecha_nacimiento', 'direccion', 'telefono', 'email', 'salario', 'acciones'];
  dataSource!: MatTableDataSource<any>;
  itemsPerPageLabel = 'Elementos por página';
  selectedEmpleadoId: number | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table') table!: MatTable<any>;

  constructor(private dialog: MatDialog, private api: ApiService, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  }
  
  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val => {
      if (val === 'guardado') {
        this.obtenerEmpleados();
      }
    });
  }

  obtenerEmpleados() {
    this.api.obtenerEmpleados().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error al obtener los registros');
      }
    });
  }

  editarEmpleado(row: any) {
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'actualizado') {
        this.obtenerEmpleados();
      }
    });
  }

  eliminarEmpleado(id: number) {
    this.api.eliminarEmpleado(id).subscribe({
      next: (res) => {
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
        console.log('Empleado eliminado:', id);
        console.log('Datos de la tabla actualizados:', this.dataSource.data);
        this.obtenerEmpleados();
      },
      error: (error) => {
        console.error('Error al eliminar el Empleado:', error);
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
