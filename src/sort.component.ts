import { Component, OnInit, ElementRef } from '@angular/core';
import { SortService } from './sort.service';

export enum SortState {
    None = 0,
    Ascending = 1,
    Descending = 2

}

@Component({
    selector: '[sort]',
    templateUrl: './sort.component.html',
    styles: [
        `
 *.unselectable {
   -moz-user-select: -moz-none;
   -khtml-user-select: none;
   -webkit-user-select: none;

   /*
     Introduced in IE 10.
     See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
   */
   -ms-user-select: none;
   user-select: none;
}
        `
    ]
})
export class SortComponent implements OnInit {
    public sortState: SortState;
    public name: string;

    constructor(private sortService: SortService, private elementRef: ElementRef) {
        this.sortState = SortState.None;
        this.sortService.onClear$.subscribe((name: string) => {
            if (this.name !== name) {
                this.sortState = SortState.None;
            }
        });
     }

    public ngOnInit() {
        this.name = this.elementRef.nativeElement.getAttribute('sort');
    }

    public toggleSortState() {
        this.sortState = ((this.sortState + 1) % 3) as SortState;
    }

    public onSortClick($event) {
        this.toggleSortState();
        switch (this.sortState) {
            case SortState.Ascending:
               this.sortService.orderBy({ name: this.name, asc: true}, $event.ctrlKey);
               break;
            case SortState.Descending:
               this.sortService.orderBy({ name: this.name, asc: false}, $event.ctrlKey);
               break;
            case SortState.None:
               this.sortService.clear(this.name, $event.ctrlKey);
               break;
        }
    }

}
