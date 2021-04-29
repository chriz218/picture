import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ImageDetailComponent } from './image-detail.component';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            // { path: 'page/:pageNumber/image/:id', component: ImageDetailComponent }
            { path: 'image/:id', component: ImageDetailComponent }
        ])
    ],
    declarations: [
        ImageDetailComponent
    ]
})
export class ImageDetailModule { }