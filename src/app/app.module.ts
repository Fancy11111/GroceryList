import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ListInfosComponent } from './components/list-infos/list-infos.component';
import { ItemInputComponent } from './components/item-input/item-input.component';


@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ListInfosComponent,
    ItemInputComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
