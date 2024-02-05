import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatInputModule} from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
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
import {MatDividerModule} from '@angular/material/divider';
import { ProductoComponent } from './producto.component'; 
import {MatListModule} from '@angular/material/list';


@NgModule({
  imports: [
    MatListModule,
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
  declarations: [ProductoComponent, DialogComponent],
  exports :[ProductoComponent]
})
export class ProductoModule { }
