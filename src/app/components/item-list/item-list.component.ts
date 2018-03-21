import { Component, OnInit } from '@angular/core';
import { ItemListService } from '../../services/item-list.service';

import { Item } from '../../shared/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})

export class ItemListComponent implements OnInit {
  public items: Item[] = [];
  constructor(private itemListService: ItemListService) { }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    this.itemListService.getItems();
    this.items = this.itemListService.items;
  }
}
