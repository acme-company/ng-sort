import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { AppModule as MyModule } from '../../../src/app.module';
import { AppModule as FilterModule } from 'ng-filter';

@NgModule({
  imports:      [ BrowserModule, MyModule.forRoot(), FilterModule ],
  declarations: [ AppComponent ],
  
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
