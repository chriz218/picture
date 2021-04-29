import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageNumberGuard } from './guards/pagenumber-guard.service';
import { HomeComponent } from '../home/home.component';
import { PageNotFoundComponent } from '../not-found/page-not-found.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'page/:pageNumber', component: HomeComponent, canActivate: [PageNumberGuard] },
            { path: 'page', redirectTo: 'page/1', pathMatch: 'full' },
            { path: '', redirectTo: 'page/1', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
          ])
    ],
    exports: [
        RouterModule 
    ]
})

export class AppRoutingModule { }