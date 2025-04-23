import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Bean } from '../../core/bean.model';
import { OrderItem } from '../../core/order-request.model';

@Component({
  selector: 'app-order-item',
  standalone: false,
  templateUrl: './order-item.component.html',
})
export class OrderItemComponent {
  @Input() bean!: Bean;

  selected: boolean = false;
  quantity: number = 0;

  @Output() quantityChange = new EventEmitter<OrderItem>();
  @Output() selectedChange = new EventEmitter<string>();
  @Output() viewDetails = new EventEmitter<Bean>();

  onQuantityChange(value: string): void {
    const quantity = parseInt(value, 10);
    
    this.quantityChange.emit({
      beanId: this.bean.id,
      quantity: isNaN(quantity) || quantity < 1 ? 1 : quantity
    });
  }

  onSelectedChange(): void {
    this.selected = !this.selected;
    this.quantity = this.selected ? 1 : 0;

    this.selectedChange.emit(this.bean.id);
  };
}
