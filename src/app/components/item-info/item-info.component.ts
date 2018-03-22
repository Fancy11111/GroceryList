import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

declare var Materialize: any;
@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessages().subscribe((msg) => {
      msg.forEach(element => {
        console.log('Debug: went through element in subscribe() loop');
      });
    });
  }

}
