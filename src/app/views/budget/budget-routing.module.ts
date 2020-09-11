import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetComponent } from './budget.component';

const routes: Routes = [
  {
    path: '',
    component: BudgetComponent,
    data: {
      title: 'Budget'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule {}
