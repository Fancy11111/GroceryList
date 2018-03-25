import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { ItemListService } from '../../services/item-list.service';

declare var M: any; // Silence Typescript warning
@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {
  public priceSum = 0;

  constructor(private messageService: MessageService, private itemListService: ItemListService) { }

  ngOnInit() {
    this.messageService.getMessagesSubject().subscribe(msg => M.toast({ html: msg, classes: 'message' }) );
    this.subscribeItemChanges();
    this.evalPriceSum();
  }

  public subscribeItemChanges() {
    this.itemListService.getItemsChangedEmitter().subscribe(() => {
      this.priceSum = 0;
      this.evalPriceSum();
    });
  }

  public evalPriceSum() {
    this.itemListService.items.forEach((item, index, items) => {
      if (item.erledigt !== 1) {
        // I need to multiply and divide to remove the floating point inaccuracy
        this.priceSum = (this.priceSum * 10 + item.kosten * 10) / 10;
      }
    });
  }

  public evalStatus() {

  }

}
