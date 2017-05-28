import { Component, OnInit } from '@angular/core';

export interface Person {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public name = 'Angular';
  public people: Person[] = [];
  constructor() {
    this.people = [
      { firstName: 'James', lastName: 'Dean'},
      { firstName: 'John', lastName: 'Smith'},
      { firstName: 'Jane', lastName: 'Doe'},
    ];
  }

  public ngOnInit() {
    console.log('called');
  }
}
