import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BeanService } from '../core/bean.service';
import { Bean } from '../core/bean.model';
import { MatDialog } from '@angular/material/dialog';
import { BeanDetailDialogComponent } from '../beans/bean-detail-dialog/bean-detail-dialog.component';
import { OrderRequest, OrderItem } from '../core/order-request.model';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  standalone: false
})
export class OrderComponent implements OnInit {
  customerForm!: FormGroup;
  beans: Bean[] = [];
  orderItems: OrderItem[] = [];
  orderSubmitted = false;
  submittedFirstName: string | null = null;

  isLoading = false;
  loadingMessage = '';

  private quantityUpdates$ = new Subject<OrderItem>();

  constructor(private fb: FormBuilder, private beanService: BeanService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.setLoadingScreen(true, 'Loading order form...');

    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      addressLine: ['', Validators.required],
      city: ['', Validators.required],
      county: [''],
      postcode: ['', Validators.required]
    });

    this.beanService.getBeans().subscribe({
      next: (data) => {
        this.beans = data.sort((a, b) => a.name.localeCompare(b.name));

        this.setLoadingScreen(false);
      },
      error: (error) => {
        console.error('Failed to load beans', error);
      }
    });

    this.quantityUpdates$
      .pipe(debounceTime(300))
      .subscribe((OrderItem) => {
        const item = this.orderItems.find(item => item.beanId === OrderItem.beanId);
        if (item) {
          item.quantity = OrderItem.quantity;
        }
      });
  }

  toggleBean(id: string): void {
    const exists = this.orderItems.some(item => item.beanId === id);

    this.orderItems = exists
      ? this.orderItems.filter(item => item.beanId !== id)
      : [...this.orderItems, { beanId: id, quantity: 1 }];
  }

  updateQuantity(orderItem: OrderItem): void {
    this.quantityUpdates$.next(orderItem);
  }

  updateSelected(id: string): void {
    this.toggleBean(id);
  }

  calculateTotal(items: OrderItem[] = this.orderItems): number {
    return items.reduce((sum, item) => {
      const bean = this.beans.find(b => b.id === item.beanId);
      const price = bean ? parseFloat(bean.cost.replace('£', '')) : 0;

      return sum + price * item.quantity;
    }, 0);
  }

  openBeanDetails(bean: Bean): void {
    this.dialog.open(BeanDetailDialogComponent, {
      width: '500px',
      data: bean
    });
  }

  submitOrder(): void {
    if (!this.canSubmit) {
      this.customerForm.markAllAsTouched();
      return;
    }

    this.setLoadingScreen(true, 'Submitting your order...');

    const order: OrderRequest = {
      ...this.customerForm.value,
      orderItems: this.orderItems
    };

    this.beanService.submitOrder(order).subscribe({
      next: (result) => {
        if (result.success) {
          this.submittedFirstName = order.firstName;
          this.orderSubmitted = true;
          this.setLoadingScreen(false);
        }
      },
      error: (error) => {
        this.setLoadingScreen(false);
        console.error('Failed to submit order', error);
      }
    });
  }

  setLoadingScreen(isLoading: boolean, message: string = ""): void {
    this.isLoading = isLoading;
    if (isLoading) {
      this.loadingMessage = message;
    }
    else {
      this.loadingMessage = "";
    }
  }

  get canSubmit(): boolean {
    return this.customerForm.valid && this.orderItems.length > 0;
  }
}
