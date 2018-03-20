import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// This import is needed for angular to support http requests
// Note: we were taught to use http from @angular/http
// but that is deprecated
import { HttpClientModule } from '@angular/common/http';
// This import is needed to support user input
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemInputComponent } from './components/item-input/item-input.component';
import { ItemListService } from './services/item-list.service';
import { MessageService } from './services/message.service';
import { ItemInfoComponent } from './components/item-info/item-info.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemInputComponent,
    ItemInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ItemListService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
