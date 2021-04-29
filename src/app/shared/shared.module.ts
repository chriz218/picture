import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule
  ],
  declarations: [
    PaginationComponent,
    NotFoundComponent
  ],
  exports: [
    BrowserModule,
    PaginationComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
