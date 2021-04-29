import { Component, Input } from '@angular/core';

@Component({
    selector: 'shared-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent { 
  @Input() title: string;
  @Input() ngIfCondition: boolean;
  @Input() route: any[];
  @Input() refreshNeeded: boolean = false;
  @Input() refreshLink: string;
}