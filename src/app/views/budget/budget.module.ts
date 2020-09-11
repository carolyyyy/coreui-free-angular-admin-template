import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { BudgetComponent } from './budget.component';
import { BudgetRoutingModule } from './budget-routing.module';

@NgModule({
  imports: [
    FormsModule,
    BudgetRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ BudgetComponent ]
})
export class BudgetModule { }
