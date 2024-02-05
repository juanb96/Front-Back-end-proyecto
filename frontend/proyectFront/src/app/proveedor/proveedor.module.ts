import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';

import { BrowserModule } from '@angular/platform-browser';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { ProveedorComponent } from './proveedor.component';


@NgModule({
  imports: [
    MatDividerModule,
    CommonModule,
    BrowserModule,
    MatToolbarModule,
    MatIconModule ,
    ReactiveFormsModule,
    MatDialogModule,
MatButtonModule,
 NoopAnimationsModule,
 MatInputModule,
MatFormFieldModule,
 FormsModule,
 HttpClientModule,
MatTableModule,
MatPaginatorModule,
MatSortModule,

  ],
  declarations: [ProveedorComponent, DialogComponent],
  exports: [ProveedorComponent]
})
export class ProveedorModule { }
