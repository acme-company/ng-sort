import { Component } from '@angular/core';
import { SortService } from "../../../src/sort.service";
import { FilterService } from "ng-filter";

export interface Person {
  firstName: string;
  lastName: string;
  birthDate: Date;
}

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [SortService, FilterService]
})
export class AppComponent {
  name = 'Angular';
  people: Person[] = [];
  x: number;
  y: number;
  constructor(public sortService: SortService, filterService:FilterService<Person>) {
    sortService.configure({
        noneClass: 'glyphicon-sort',
        ascendingClass: 'glyphicon-triangle-top',
        descendingClass: 'glyphicon-triangle-bottom'
    });
    filterService.configure({
      firstName: (person:Person, value:string) => new RegExp('^' + value.trim(), 'i').test(person.firstName), 
      lastName: (person:Person, value:string) => new RegExp('^' + value.trim(), 'i').test(person.lastName),
    });
    
    this.people = [
      { firstName: 'James', lastName: 'Dean', birthDate: new Date(2012, 5, 1) },
      { firstName: 'John', lastName: 'Smith', birthDate: new Date(2012, 5, 1) },
      { firstName: 'Jane', lastName: 'Doe', birthDate: new Date(2011, 1, 1) },
      { firstName: 'Terry', lastName: 'Rundle', birthDate: new Date(2015, 6, 12) },
      { firstName: 'Barry', lastName: 'White', birthDate: new Date(2009, 3, 19) },
    ];

    function makeId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    
    for (var i = 0; i < 10000; ++i) {
      this.people.push({ firstName: makeId(), lastName: makeId(), birthDate: new Date(2012,1,1) });
    }
  }

}
