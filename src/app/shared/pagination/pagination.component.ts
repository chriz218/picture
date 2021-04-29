import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'shared-pagination',
    templateUrl: './pagination.component.html'
})
export class PaginationComponent {
    @Input() currentPage: number;
    @Input() pageArray: any[];
    @Output('clicked') clicked: EventEmitter<number> = new EventEmitter<number>();

    buttonClicked(number: number): void {
        this.clicked.emit(number);
    }

} 