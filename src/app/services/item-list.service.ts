import { Injectable } from '@angular/core';
// This imports the HttpClient so that the service item-list can make
// http request to the backend (in my case deployd)
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
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
  public itemsChangedSubject = new Subject<string>();

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  public getItemsChangedEmitter(): Subject<string> {
    return this.itemsChangedSubject;
  }

  public emitItemsChanged() {
    this.itemsChangedSubject.next();
  }

  public addItem(item: Item) {
    const exists = this.items.filter((value: Item, index: Number, array: Item[]) => value.produkt === item.produkt).length > 0;
    if (!exists) {
      this.http.post<Item>(this.url, item, this.httpOptions).subscribe((data: Item) => {
        this.items.push(data);
        this.emitItemsChanged();
      });
    } else {
      this.log('Item ' + item.produkt + ' already exists', true);
    }
  }

  public getItems() {
    this.http.get<Item[]>(this.url, this.httpOptions).subscribe(items => {
      this.items = items;
    });
  }

  public deleteItem(id: string) {
    this.http.delete<Item[]>(this.url + id, this.httpOptions).subscribe(() => {
      this.items.forEach((element, index) => {
        if (element.id === id) {
          this.items.splice(index, 1);
          this.emitItemsChanged();
        }
      });
    });
  }

  public switchItemStatus(id: string, status: number) {
    this.http.put<Item[]>(this.url + id, {'erledigt': status}, this.httpOptions).subscribe(() => {
      this.items.forEach((element, index) => {
        if (element.id === id) {
          element.erledigt = status;
          this.items.splice(index, 1, element);
          this.emitItemsChanged();
        }
      });
    });
  }

  public sort(field: string, orderSort: boolean) {
    const negator = (orderSort ? 1 : -1); // Needed to multiply value comparison in sort fn

    this.items.sort((a: Item, b: Item) => {
      // Sort logic
      if (field === 'produkt') {
        return this.compareStrings(a[field], b[field]) * negator;
      } else if (field === 'kosten') {
        return this.compareNumbers(parseFloat(a[field].toString()), parseFloat(b[field].toString())) * negator;
      } else {
        if (a[field] > b[field]) {
          return 1 * negator;
        } else if (a[field] < b[field]) {
          return -1 * negator;
        } return 0;
      }
    });
  }

  compareStrings(a: string, b: string): number {
    if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    } else if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    }
    return 0;
  }

  compareNumbers (a: number, b: number) {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
    return 0;
  }

  public log(message: string, notifyUser: boolean) {
    this.messageService.log(message, notifyUser);
  }
}
