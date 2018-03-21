import { Component, OnInit, ElementRef } from '@angular/core';
import { ItemListService } from '../../services/item-list.service';
import { Item } from '../../shared/item';

declare var $: any;

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})

export class ItemListComponent implements OnInit {
  constructor(private itemListService: ItemListService, private elRef: ElementRef) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.itemListService.getItems();
  }

  deleteItem(id: String){
    this.itemListService.deleteItem(id);
  }

  switchItemStatus(id: String) {
    $(this.elRef.nativeElement).find('#' + id).val();
    const checked = !$(this.elRef.nativeElement).find('#' + id).prop("checked");
    checked ? this.itemListService.switchItemStatus(id, 1) : this.itemListService.switchItemStatus(id, 0);
    //this.itemListService.switchItemStatus(id, )
  }
}
