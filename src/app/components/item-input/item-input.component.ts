import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../shared/item';
import { ItemListService } from '../../services/item-list.service';

@Component({
  selector: 'app-item-input',
  templateUrl: './item-input.component.html',
  styleUrls: ['./item-input.component.css']
})
export class ItemInputComponent implements OnInit {
  @Input() item = new Item('', 1);

  constructor(private itemListService: ItemListService) { }

  ngOnInit() {
  }

  public addItem() {
    if (this.item.produkt !== '') {
      this.itemListService.addItem(this.item);
      this.item.produkt = '';
    }
  }

}
