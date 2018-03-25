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
  public displayChecked = -1;
  public sortBy = '';
  public sortOrder = true;
  constructor(private itemListService: ItemListService, private elRef: ElementRef) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.itemListService.getItems();
  }

  deleteItem(id: string) {
    this.itemListService.deleteItem(id);
  }

  switchDisplay() {
    this.displayChecked = this.displayChecked === -1 ? 1 : -1;
  }

  public sort(field: string) {
    if (field === this.sortBy) {
      this.sortOrder = !this.sortOrder;
    } else {
      this.sortBy = field;
      this.sortOrder = true;
    }
    this.itemListService.sort(this.sortBy, this.sortOrder);
    console.log(this.sortBy + this.sortOrder);
  }

  switchItemStatus(id: string) {
    $(this.elRef.nativeElement).find('#' + id).val();
    // The const checked gets its value assigned before the value of the
    // checkbox actually switches, which is why we negate the value we get
    const checked = !$(this.elRef.nativeElement).find('#' + id).prop('checked');
    checked ? this.itemListService.switchItemStatus(id, 1) : this.itemListService.switchItemStatus(id, 0);
  }

  isItemDone(item: Item): boolean {
    return item.erledigt === 0;
  }
}
