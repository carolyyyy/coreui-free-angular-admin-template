import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ChartsComponent } from './charts.component';
import { ChartsRoutingModule } from './charts-routing.module';

@NgModule({
  imports: [
    FormsModule,
    ChartsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ ChartsComponent ]
})
export class ChartModule { }
