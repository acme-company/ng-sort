import { Component } from '@angular/core';
import { SortService } from "../../../src/sort.service";

export interface Person {
  firstName: string;
  lastName: string;
  birthDate: Date;
}

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [SortService]
})
export class AppComponent {
  name = 'Angular';
  people: Person[] = [];
  constructor() {
    this.people = [
      { firstName: 'James', lastName: 'Dean', birthDate: new Date(2012, 5, 1) },
      { firstName: 'John', lastName: 'Smith', birthDate: new Date(2012, 5, 1) },
      { firstName: 'Jane', lastName: 'Doe', birthDate: new Date(2011, 1, 1) },
      { firstName: 'Terry', lastName: 'Rundle', birthDate: new Date(2015, 6, 12) },
      { firstName: 'Barry', lastName: 'White', birthDate: new Date(2009, 3, 19) },
    ];
  }

}
