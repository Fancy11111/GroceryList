import { Injectable } from '@angular/core';
// This imports the HttpClient so that the service item-list can make
// http request to the backend (in my case deployd)
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Item } from '../shared/item';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ItemListService {
  items: Item[] = [];

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
    return this.http.post<Item>(this.url, item, httpOptions)
          .pipe(tap(_ => this.log(`added item id=${item.id}`, true))).subscribe((data: Item) => { this.items.push(data); });
  }

  public getItems() {
    this.http.get<Item[]>(this.url, this.httpOptions).pipe(tap(data => this.items = data)).subscribe();
    return this.items;
  }

  public log(message: string, notifyUser: boolean) {
    this.messageService.log(message, notifyUser);
  }
}
