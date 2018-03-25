import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ItemListService } from '../../services/item-list.service';
import { Item } from '../../shared/item';

declare var $: any;

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})

export class ItemListComponent implements OnInit {
  @Input() public displayChecked = true;
  public sortBy = '';
  public sortOrder = true;
  public icon = '';
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

  public sort(field: string) {
    if (field === this.sortBy) {
      this.sortOrder = !this.sortOrder;
    } else {
      this.sortBy = field;
      this.sortOrder = true;
    }
    this.icon = (this.sortOrder ? 'arrow_drop_down' : 'arrow_drop_up');
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
