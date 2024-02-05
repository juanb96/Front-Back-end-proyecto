import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component'; 
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from './CustomPaginatorIntl/CustomPaginatorIntl.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['idUsuario', 'nombreUsuario','contrasena','correoElectronico','tipoUsuario',  'acciones'];
  dataSource!: MatTableDataSource<any>;

  selectedUsuarioId: number | undefined;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table') table!: MatTable<any>;

  constructor(private dialog: MatDialog, private api: ApiService, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  }

  ngOnInit(): void{
    this.obtenerTodosUsuarios();
  }
  openDialog() {   
    this.dialog.open(DialogComponent,{
      width:'40%'
    }).afterClosed().subscribe(val=>{
      if (val==='guardado') {
        this.obtenerTodosUsuarios();  
      }
    })
  }

  obtenerTodosUsuarios(idUsuario?: number) {
    this.api.obtenerUsuarios().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
  
        if (idUsuario) {
          this.selectedUsuarioId = idUsuario;
        }
      },
      error: (err) => {
        alert("Error al obtener los registros");
      }
    });
  }
  
  editarUsuario(row: any){
    this.dialog.open(DialogComponent,{
      width:"40%",
      data: row
    }).afterClosed().subscribe(val=>{
      if (val==="actualizado") {
        this.obtenerTodosUsuarios();
      }
    })
    
  }

  eliminarUsuario(id: number) {
    this.api.eliminarUsuarios(id).subscribe({
      next: (res) => {
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
        console.log('imagen eliminado:', id);
      console.log('Datos de la tabla actualizados:', this.dataSource.data);
      this.obtenerTodosUsuarios();
      },
      error: (error) => {
        console.error("Error al eliminar la imagen:", error);
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
