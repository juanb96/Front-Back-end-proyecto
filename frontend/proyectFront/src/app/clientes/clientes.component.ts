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
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class ClientesComponent implements OnInit {

  displayedColumns: string[] = ['idCliente', 'nombreCliente', 'direccion', 'correoElectronico', 'numeroDeTelefono', 'acciones'];
  dataSource!: MatTableDataSource<any>;
  itemsPerPageLabel = 'Elementos por página';
  selectedClienteId: number | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table') table!: MatTable<any>;

  constructor(private dialog: MatDialog, private api: ApiService, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  }
  

  ngOnInit(): void {
    this.obtenerClientes();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val => {
      if (val === 'guardado') {
        this.obtenerClientes();
      }
    });
  }

  obtenerClientes(idCliente?: number) {
    this.api.obtenerClientes().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);

        if (idCliente) {
          this.selectedClienteId = idCliente;
        }
      },
      error: (err) => {
        alert('Error al obtener los registros');
      }
    });
  }

  editarCliente(row: any) {
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'actualizado') {
        this.obtenerClientes();
      }
    });
  }

  eliminarCliente(id: number) {
    this.api.eliminarCliente(id).subscribe({
      next: (res) => {
        this.dataSource.data = this.dataSource.data.filter(item => item.idCliente !== id);
        console.log('Cliente eliminado:', id);
        console.log('Datos de la tabla actualizados:', this.dataSource.data);
        this.obtenerClientes();
      },
      error: (error) => {
        console.error('Error al eliminar el Cliente:', error);
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
