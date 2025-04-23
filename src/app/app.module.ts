import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BeanListComponent } from './beans/bean-list/bean-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BeanDetailComponent } from './beans/bean-detail/bean-detail.component';
import { BeanDetailDialogComponent } from './beans/bean-detail-dialog/bean-detail-dialog.component';
import { OrderComponent } from './order/order.component';
import { OrderItemComponent } from './order/order-item/order-item.component';

@NgModule({
  declarations: [
    AppComponent,
    BeanListComponent,
    BeanDetailComponent,
    BeanDetailDialogComponent,
    OrderComponent,
    OrderItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
