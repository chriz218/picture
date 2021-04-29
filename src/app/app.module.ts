import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { PageNotFoundComponent } from './not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { ImageDetailModule } from './image/image-detail.module';

@NgModule({
  imports: [
    HttpClientModule,
    SharedModule,
    ImageDetailModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }