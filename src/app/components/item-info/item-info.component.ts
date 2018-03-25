import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { ItemListService } from '../../services/item-list.service';
import { tap } from 'rxjs/operators';

declare var M: any; // Silence Typescript warning
@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {
  public priceSum = 0;
  public itemsUndone = 0;
  public countClass = '';

  constructor(private messageService: MessageService, private itemListService: ItemListService) { }

  ngOnInit() {
    this.messageService.getMessagesSubject().subscribe(msg => M.toast({ html: msg, classes: 'message' }) );
    this.subscribeItemChanges();
    this.evalPriceSum();
  }

  public subscribeItemChanges() {
    this.itemListService.getItemsChangedEmitter().subscribe(() => {
      this.evalPriceSum();
      this.evalStatus();
    });
  }

  public evalPriceSum() {
    this.priceSum = 0;
    this.itemListService.items.forEach((item, index, items) => {
      if (item.erledigt !== 1) {
        // I need to multiply and divide to remove the floating point inaccuracy
        this.priceSum = (this.priceSum * 10 + item.kosten * 10) / 10;
      }
    });
  }

  public evalStatus() {
    this.itemsUndone = 0;
    this.itemListService.items.forEach((item, index, items) => {
      if (item.erledigt !== 1) {
        this.itemsUndone += 1;
      }
    });
    if (this.itemsUndone < 10) {
      this.countClass = 'collection-item green lighten-2';
    } else {
      this.countClass = 'collection-item red lighten-3';
    }
  }

}
