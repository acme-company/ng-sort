# ng-sort  

[![Build Status](https://travis-ci.org/acme-company/ng-sort.svg?branch=master)](https://travis-ci.org/acme-company/ng-sort) [![Build Status](https://ci.appveyor.com/api/projects/status/2h0bkhhh1s3bi40q/branch/master?svg=true)](https://ci.appveyor.com/project/pixelbits-mk/ng-sort/branch/master) [![npm version](https://badge.fury.io/js/ng-sort.svg)](https://badge.fury.io/js/ng-sort) [![Downloads](http://img.shields.io/npm/dm/ng-sort.svg)](https://npmjs.org/package/ng-sort) [![Build Status](https://saucelabs.com/buildstatus/pixelbits-mk)](https://saucelabs.com/beta/builds/69fc3e3ba2554ec0bc418423766b381f) [![dev Dependencies](https://david-dm.org/acme-company/ng-sort.svg)](https://david-dm.org/acme-company/ng-sort) [![devDependencies](https://david-dm.org/acme-company/ng-sort/dev-status.svg)](https://david-dm.org/acme-company/ng-sort?type=dev) [![peer Dependencies](https://img.shields.io/david/peer/acme-company/ng-sort.svg)](https://github.com/acme-company/ng-sort.git) [![npm](https://img.shields.io/npm/v/ng-sort.svg)](https://www.npmjs.com/package/ng-sort)  [![Github Forks](https://img.shields.io/github/forks/acme-company/ng-sort.svg?style=social&label=Fork)](https://github.com/acme-company/ng-sort) [![Github Stars](https://img.shields.io/github/stars/acme-company/ng-sort.svg?style=social&label=Star)](https://github.com/acme-company/ng-sort) [![Github Watchers](https://img.shields.io/github/watchers/acme-company/ng-sort.svg?style=social&label=Watch)](https://github.com/acme-company/ng-sort) [![npm license](https://img.shields.io/npm/l/ng-sort.svg)](https://www.npmjs.com/package/ng-sort) [![GitHub issues](https://img.shields.io/github/issues/acme-company/ng-sort.svg)](https://github.com/acme-company/ng-sort/issues) [![GitHub closed issues](https://img.shields.io/github/issues-closed/acme-company/ng-sort.svg)](https://github.com/acme-company/ng-sort/issues?q=is%3Aissue+is%3Aclosed) [![GitHub pull requests](https://img.shields.io/github/issues-pr/acme-company/ng-sort.svg)](https://github.com/acme-company/ng-sort/pulls) [![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/acme-company/ng-sort.svg)](https://github.com/acme-company/ng-sort/pulls?q=is%3Apr+is%3Aclosed) [![Gitter](https://badges.gitter.im/acme-company/ng-sort.svg)](https://gitter.im/acme-company/ng-sort?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge) [![GitHub release](https://img.shields.io/github/release/acme-company/ng-sort.svg)](https://github.com/acme-company/ng-sort/releases) [![GitHub tag](https://img.shields.io/github/tag/acme-company/ng-sort.svg)](https://github.com/acme-company/ng-sort/tags) [![Github All Releases](https://img.shields.io/github/downloads/acme-company/ng-sort/total.svg)](https://github.com/acme-company/ng-sort/releases)



[![Build Status](https://saucelabs.com/browser-matrix/pixelbits-mk.svg)](https://saucelabs.com/beta/builds/69fc3e3ba2554ec0bc418423766b381f)

## Demo

https://acme-company.github.io/ng-sort/

Note: For multi-column sort, hold down CTRL key while clicking the table header.

## Installation

```
npm install ng-sort --save
```

# Usage

## App.Module.ts
```typescript
import { NgModule } from "@angular/core";
...
import { AppModule as SortModule } from 'ng-sort';

@NgModule({
    imports: [
        ...
        SortModule
    ],
    ...
})
export class AppModule {

}
```

## App.Component.html
```html
  <table class="table table-hover">
      <thead>
          <tr>
              <td sort="firstName">First Name</td>
              <td sort="lastName">Last Name</td>
              <td sort="birthDate">Birthdate</td>
          </tr>
      </thead>
      <tbody>
          <tr *ngFor="let person of people | sort">
              <td>{{ person.firstName }}</td>
              <td>{{ person.lastName }}</td>
              <td>{{ person.birthDate | date:'yyyy-MM-dd' }}</td>
          </tr>
      </tbody>
      <tfoot>
          <tr>
              <td colspan="3">

              </td>
          </tr>
      </tfoot>
  </table>
```
## App.Component.ts
Add the SortService to the providers array for each of your list components.  The scope of SortService should not be global because it tracks sort state for a single list.

```typescript
import { Component } from '@angular/core';
import { SortService } from 'ng-sort';

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
  constructor(sortService: SortService) {
    sortService.configure({
        noneClass: 'glyphicon-sort',
        ascendingClass: 'glyphicon-triangle-top',
        descendingClass: 'glyphicon-triangle-bottom'
    });

    this.people = [
      { firstName: 'James', lastName: 'Dean', birthDate: new Date(2012, 5, 1) },
      { firstName: 'John', lastName: 'Smith', birthDate: new Date(2012, 5, 1) },
      { firstName: 'Jane', lastName: 'Doe', birthDate: new Date(2011, 1, 1) },
      { firstName: 'Terry', lastName: 'Rundle', birthDate: new Date(2015, 6, 12) },
      { firstName: 'Barry', lastName: 'White', birthDate: new Date(2009, 3, 19) },
    ];
  }
}

```
## Customizing Sort Icons

```typescript
sortService.configure({
    noneClass: 'glyphicon-sort',
    ascendingClass: 'glyphicon-triangle-top',
    descendingClass: 'glyphicon-triangle-bottom'
});
```
```css
/* include in CSS from index.html */

@font-face {
    font-family: 'Glyphicons Halflings';

    src: url('http://getbootstrap.com/dist/fonts/glyphicons-halflings-regular.eot');
    src: url('http://getbootstrap.com/dist/fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'), 
    url('http://getbootstrap.com/dist/fonts/glyphicons-halflings-regular.woff2') format('woff2'), 
    url('http://getbootstrap.com/dist/fonts/glyphicons-halflings-regular.woff') format('woff'), 
    url('http://getbootstrap.com/dist/fonts/glyphicons-halflings-regular.ttf') format('truetype'), 
    url('http://getbootstrap.com/dist/fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular') format('svg');
}

.glyphicon {
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.glyphicon-sort:before {
    content: "\e150";
}

.glyphicon-triangle-bottom:before {
    content: "\e252";
}

.glyphicon-triangle-top:before {
    content: "\e253";
}

/* when the header is clicked, do not allow select */
td[sort] {
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

```
