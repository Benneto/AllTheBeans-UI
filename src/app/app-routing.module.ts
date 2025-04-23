import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeanListComponent } from './beans/bean-list/bean-list.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: '', component: BeanListComponent },
  { path: 'order', component: OrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
