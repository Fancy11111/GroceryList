import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

declare var M: any; // Silence Typescript warning
@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessagesSubject().subscribe(msg => M.toast({ html: msg, classes: 'message' }) );
  }

}
