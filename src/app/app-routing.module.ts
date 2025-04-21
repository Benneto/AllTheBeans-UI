import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeanListComponent } from './beans/bean-list/bean-list.component';

const routes: Routes = [
  { path: '', component: BeanListComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
