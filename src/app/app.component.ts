import { Component } from '@angular/core';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemInputComponent } from './components/item-input/item-input.component';
import { ItemInfoComponent } from './components/item-info/item-info.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  header = 'My Grocery List';
}
