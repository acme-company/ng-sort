import { Component, OnInit, ElementRef } from '@angular/core';
import { SortService, SortParameter } from './sort.service';

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
    public sortParameter: SortParameter;

    constructor(private sortService: SortService, private elementRef: ElementRef) {
        if (sortService.options === undefined) {
            sortService.configure({
                noneClass: 'glyphicon-sort',
                ascendingClass: 'glyphicon-triangle-top',
                descendingClass: 'glyphicon-triangle-bottom'
            });
        }
     }

    public ngOnInit() {
        const name = this.elementRef.nativeElement.getAttribute('sort');
        this.sortParameter = this.sortService.register(name);
    }

    public onSortClick($event) {
        const nextSort = this.nextSort(this.sortParameter.asc);
        if (!$event.ctrlKey) {
            this.sortService.clear();
        }
        this.sortService.update(this.sortParameter.name, nextSort);
    }

    public get sortClass(): string {
        if (this.sortParameter.asc === undefined) {
            return this.sortService.options.noneClass;
        }
        if (this.sortParameter.asc === true) {
            return  this.sortService.options.ascendingClass;
        }
        if (this.sortParameter.asc === false) {
            return  this.sortService.options.descendingClass;
        }
    }

    private nextSort(current: boolean): boolean {
        if (current === undefined) {
            return true;
        } else if (current === true) {
            return false;
        } else {
            return undefined;
        }
    }
}
