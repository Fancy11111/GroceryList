import { Injectable } from '@angular/core';
// This imports the HttpClient so that the service item-list can make
// http request to the backend (in my case deployd)
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Item } from '../shared/item';

@Injectable()
export class ItemListService {
  public items: Item[] = [];
  // Switch the content of this field to use another url
  // if you another backend or named your dpd collection differently
  private url = 'http://localhost:2403/einkaufsliste/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  public addItem(item: Item) {
    this.log('Test', false);
    return this.http.post<Item>(this.url, item, this.httpOptions).subscribe((data: Item) => { this.items.push(data); });
  }

  public getItems() {
    this.http.get<Item[]>(this.url, this.httpOptions).subscribe(items => {
      this.items = items;
    });
  }

  public deleteItem(id: String) {
    this.http.delete<Item[]>(this.url + id, this.httpOptions).subscribe(() => {
      this.items.forEach((element, index) => {
        if (element.id === id) {
          this.items.splice(index, 1);
        }
      });
    });
  }

  public switchItemStatus(id: String, status: number) {
    this.http.put<Item[]>(this.url + id, {'erledigt': status}, this.httpOptions).subscribe(() => {
      this.items.forEach((element, index) => {
        if (element.id === id) {
          element.erledigt = status;
          this.items.splice(index, 1, element);
        }
      });
    });
  }

  public log(message: string, notifyUser: boolean) {
    this.messageService.log(message, notifyUser);
  }
}
