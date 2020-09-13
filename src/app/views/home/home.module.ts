import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AccordionModule } from 'ngx-bootstrap/accordion';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import {AppBreadcrumbModule} from '@coreui/angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    AppBreadcrumbModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [ HomeComponent ]
})
export class HomeModule { }
