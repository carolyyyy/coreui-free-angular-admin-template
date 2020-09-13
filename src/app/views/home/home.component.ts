import { SelectorMatcher } from '@angular/compiler';
import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'demo-accordion-opened',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {

  }

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
//   months = [1,2,3,4,5,6,7,8,9,10,11,12];
   month = new Date().getMonth()+1;
   year = new Date().getFullYear();

   addNote: string;
   addMoney: number;
   addDate: Date = new Date();
   addCatogory: string;

   addCatogoryName: string;
   editCatogorySelectName: string;
   editCatogoryName: string;
   deleteCatogoryName: string;

   editRecordNote: string;
   editRecordMoney: number;
   editRecordDate: Date;
   editRecordCatogory: string;

  catogories = [
    {
      name: 'Utilities',
      money: -1010.23,
      records: [
        {
          note: 'book',
          money: -10.23,
          date: new Date('2020/9/12')
        },
        {
          note: 'printer',
          money: -1000.00,
          date: new Date('2020/9/12')
        }
      ]
    },
    {
      name: 'Travel',
      money: -2000.00,
      records: [
        {
          note: 'traffic',
          money: -1000.00,
          date: new Date('2020/9/12')
        },
        {
          note: 'hotel',
          money: -1000.00,
          date: new Date('2020/9/12')
        }
      ]
    }
  ]

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  openModalWithAddRecord(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalWithEditRecord(template: TemplateRef<any>, recordNote: string, recordMoney: number, recordDate: Date, recordCatogory: string) {
    this.modalRef = this.modalService.show(template);
    console.log(recordNote);
    console.log(recordMoney);
    this.editRecordNote = recordNote;
    this.editRecordMoney = recordMoney;
    this.editRecordDate = recordDate;
    this.editRecordCatogory = recordCatogory;
  }

  openModalWithDeleteRecord(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalWithAddCatogory(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalWithEditCatogory(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalWithDeleteCatogory(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    // this.message = 'Confirmed!';
    this.modalRef.hide();
  }
 
  decline(): void {
    // this.message = 'Declined!';
    this.modalRef.hide();
  }

  addRecord(){
    if(this.addNote == null){
      alert("Note can not be empty!");
    }else if(this.addMoney == null){
      alert("Money can not be empty!");
    }else if(/^-?\d+\.?\d+$/.test(this.addMoney.toString())){
      alert("Money must be a valid number!");
    }else if(this.addCatogory == null){
      alert("Catogory can not be empty!");
    }else{
      for(var i=0;i<this.catogories.length;i++){
        if(this.catogories[i].name == this.addCatogory){
          this.catogories[i].records.push({
            note: this.addNote,
            money: this.addMoney,
            date: this.addDate})
            break;
        }
      }
    }
    this.modalRef.hide();
  }

}





