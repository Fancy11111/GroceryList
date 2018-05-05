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
  public countClass = '';

  constructor(private messageService: MessageService, private itemListService: ItemListService) { }

  ngOnInit() {
    this.messageService.getMessagesSubject().subscribe(msg => M.toast({ html: msg, classes: 'message' }) );
  }

}
