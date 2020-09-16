import { SelectorMatcher } from '@angular/compiler';
import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Category} from './Category';
import {HomeList} from './HomeList';
import {Record} from './Record';
import {ServiceService} from './service.service';

@Component({
  selector: 'demo-accordion-opened',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit{

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private service: ServiceService, private httpClient: HttpClient) {
    this.bsRangeValue = [this.firstDate, this.secondDate]
  }

  categories: Category[] = [];

  ngOnInit() {
   this.findCategoryList();
    //console.log(this.results);
    this.dateChange(this.bsRangeValue);
  }

  findCategoryList(): void {
    this.service.getCatList().subscribe((data) => {
      this.categories = data;
      console.log(data);
      console.log(this.categories);
    });
    
  }


  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
//   months = [1,2,3,4,5,6,7,8,9,10,11,12];
  //  month = new Date().getMonth()+1;
  //  year = new Date().getFullYear();

   secondDate: Date = new Date();
   firstDate: Date = new Date(this.secondDate.getFullYear(),this.secondDate.getMonth(),1);
   bsRangeValue: Date[];

   addNote: string;
   addMoney: string;
   addOutcome: string;
   addDate: Date = new Date();
   addCatogory: string;

   add_record: Record;

   addCatogoryName: string;
   editCatogorySelectName: string;
   editCatogoryName: string;
   deleteCatogoryName: string;

   editRecordNote: string;
   editRecordMoney: string;
   editRecordOutcome: string;
   editRecordDate: Date;
   editRecordCatogory: string;

    catogories: HomeList[] = [];
  // catogories = [
  //   {
  //     name: 'Utilities',
  //     money: -1010.23,
  //     records: [
  //       {
  //         note: 'book',
  //         money: -10.23,
  //         isOutcome: true,
  //         date: new Date('2020/9/12')
  //       },
  //       {
  //         note: 'printer',
  //         money: -1000.00,
  //         isOutcome: true,
  //         date: new Date('2020/9/12')
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Travel',
  //     money: -2000.00,
  //     records: [
  //       {
  //         note: 'traffic',
  //         money: -1000.00,
  //         isOutcome: true,
  //         date: new Date('2020/9/12')
  //       },
  //       {
  //         note: 'hotel',
  //         money: -1000.00,
  //         isOutcome: true,
  //         date: new Date('2020/9/12')
  //       }
  //     ]
  //   }
  // ]

  // categories = [{
  //   id: 1,
  //   name: 'Utilities'
  // },{
  //   id: 2,
  //   name: 'Travel'
  // }]

  dateChange(value: Date[]){
    // this.firstDate = this.bsRangeValue[0];
    // this.secondDate = this.bsRangeValue[1];
    this.bsRangeValue = value;
    console.log(this.bsRangeValue[0]);
    console.log(this.bsRangeValue[1]);
    this.service.getRecordList(this.bsRangeValue[0].getFullYear() + '/' + (this.bsRangeValue[0].getMonth()+1) + '/' + this.bsRangeValue[0].getDate(), 
                            this.bsRangeValue[1].getFullYear() + '/' + (this.bsRangeValue[1].getMonth()+1) + '/' + this.bsRangeValue[1].getDate())
                            .subscribe((data) => {
      this.catogories = data;
      console.log(data);
      console.log(this.categories);
    });
  }

  change(){
    console.log(this.addOutcome);
  }

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

  openModalWithEditRecord(template: TemplateRef<any>, recordNote: string, recordMoney: number, recordOutcome: boolean, recordDate: Date, recordCatogory: string) {
    this.modalRef = this.modalService.show(template);
    console.log(recordNote);
    console.log(recordMoney);
    if(recordOutcome){
      this.editRecordOutcome = 'Outcome';
    }else{
      this.editRecordOutcome = 'Income';
    }
    
    this.editRecordNote = recordNote;
    this.editRecordMoney = recordMoney.toString().replace('-','');
    this.editRecordDate = new Date(recordDate);
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

  confirm(id: number): void {
    // this.message = 'Confirmed!';
    //call delRecord getAllRecords
    this.modalRef.hide();
    this.service.deleteRecord(id,this.bsRangeValue[0].getFullYear() + '/' + (this.bsRangeValue[0].getMonth()+1) + '/' + this.bsRangeValue[0].getDate(), 
    this.bsRangeValue[1].getFullYear() + '/' + (this.bsRangeValue[1].getMonth()+1) + '/' + this.bsRangeValue[1].getDate())
    .subscribe((data) => {
      this.catogories = data;
      console.log(data);
      console.log(this.catogories);
    })
  }
 
  decline(): void {
    // this.message = 'Declined!';
    this.modalRef.hide();
  }

  addRecordClose(){
    this.modalRef.hide();
    this.addNote = null;
    this.addMoney = null;
    this.addOutcome = null;
    this.addDate = new Date();
    this.addCatogory = null;
  }

  addRecord(){
    if(this.addNote == null){
      alert("Note can not be empty!");
    }else if(this.addMoney == null){
      alert("Money can not be empty!");
    }else if(this.addMoney.indexOf('-')!=-1){
      alert("Money must be a positive number!");
    }else if(isNaN(parseFloat(this.addMoney))){
      alert("Money must be a valid number!");
    }else if(this.addOutcome == null){
      alert("Record must have a type of outcome or income!");
    }else if(this.addCatogory == null){
      alert("Category can not be empty!");
    }else{
      var money;
      if(this.addMoney.indexOf('.') != -1 && (this.addMoney.indexOf('.')+3)<this.addMoney.length){
        money = this.addMoney.substring(0,this.addMoney.indexOf(".")+3);
      }else{
        money = this.addMoney;
      }
      var catId;
      for(var i=0;i<this.categories.length;i++){
        if(this.addCatogory == this.categories[i].name){
          catId = this.categories[i].id;
          break;
        }
      }
      this.add_record = {
              note: this.addNote,
              outcome: Boolean(this.addOutcome=='Outcome'),
              money: parseFloat(money),
              date: this.addDate.getFullYear() + '/' + (this.addDate.getMonth()+1) + '/' + this.addDate.getDate(),
              id: null,
              categoryId: catId
            };
      this.service.addRecord(this.add_record,this.bsRangeValue[0].getFullYear() + '/' + (this.bsRangeValue[0].getMonth()+1) + '/' + this.bsRangeValue[0].getDate(), 
                            this.bsRangeValue[1].getFullYear() + '/' + (this.bsRangeValue[1].getMonth()+1) + '/' + this.bsRangeValue[1].getDate())
                            .subscribe((data) => {
      this.catogories = data;
      console.log(data);
      console.log(this.categories);
    });
      //call addRecord getAllRecords
      // for(var i=0;i<this.catogories.length;i++){
      //   if(this.catogories[i].name == this.addCatogory){
      //     this.catogories[i].records.push({
      //       note: this.addNote,
      //       isOutcome: Boolean(this.addOutcome=='Outcome'),
      //       money: parseFloat(this.addMoney.substring(0,this.addMoney.indexOf(".")+3)),
      //       date: this.addDate})
            this.modalRef.hide();
            this.addNote = null;
            this.addMoney = null;
            this.addOutcome = null;
            this.addDate = new Date();
            this.addCatogory = null;
            // break;
      //   }
      // }
    }
    
  }

  addCatogoryFunctionClose(){
    this.modalRef.hide();
    this.addCatogoryName = null;
  }

  addCatogoryFunction(){
    if(this.addCatogoryName == null){
      alert("Category name can not be empty!");
    }else{
      for(var i=0;i<this.categories.length;i++){
        if(this.addCatogoryName == this.categories[i].name){
          alert("Category name can not be repeated!");
          return;
        }
      }
      var name = this.addCatogoryName;
      //call addCategory getAllCats
      this.service.addCategory({name} as Category).subscribe((data) => {
        this.categories.push(data);
        console.log(data);
        console.log(this.categories);
      });
      // this.categories.push({
      //   id: this.categories[this.categories.length-1].id+1,
      //   name: this.addCatogoryName
      // })
      this.modalRef.hide();
      this.addCatogoryName = null;
    }

  }

  editCategoryFunctionClose(){
    this.modalRef.hide();
    this.editCatogorySelectName = null;
    this.editCatogoryName = null;
  }

  editCategoryFunction(){
    if(this.editCatogorySelectName == null){
      alert("Please select a category which is going to be edited!");
    }else if(this.editCatogoryName == null){
      alert("Category name can not be empty!");
    }else{

      for(var i=0;i<this.categories.length;i++){
        if(this.editCatogoryName == this.categories[i].name){
          alert("Category name can not be repeated!");
          return;
        }
      }
      //call editCat

        for(var i=0;i<this.categories.length;i++){
       
          if(this.editCatogorySelectName == this.categories[i].name){
            this.categories[i].name = this.editCatogoryName;
            this.service.updateCategory(this.categories[i].id,this.editCatogoryName).subscribe();
            break;
          }
        }
  
        for(var i=0;i<this.catogories.length;i++){
          if(this.editCatogorySelectName == this.catogories[i].name){
            this.catogories[i].name = this.editCatogoryName;
            break;
          }
  
        this.modalRef.hide();
        this.editCatogorySelectName = null;
        this.editCatogoryName = null;
      }

    }
  }

  deleteCategoryFunctionClose(){
    this.modalRef.hide();
    this.deleteCatogoryName = null;
  }

  deleteCategoryFunction(){
    if(this.deleteCatogoryName == null){
      alert("Category name can not be empty!");
    }else{
            //call delCat
      for(var i=0;i<this.categories.length;i++){
        if(this.categories[i].name == this.deleteCatogoryName){
          this.service.deleteCategory(this.categories[i].id).subscribe();
          this.categories.splice(i,1);
          
          break;
        }
      }

      for(var i=0;i<this.catogories.length;i++){
        if(this.catogories[i].name == this.deleteCatogoryName){
          this.catogories.splice(i,1);
          break;
        }
      }

      this.modalRef.hide();
      this.deleteCatogoryName = null;
    }
  }

  editRecordFunctionClose(){
    this.modalRef.hide();

  }

  editRecordFunction(id: number, cname: string){
    console.log(id);
    // console.log(cid);
    console.log(cname);
    if(this.editRecordNote == null){
      alert("Note can not be empty!");
    }else if(this.editRecordMoney == null){
      alert("Money can not be empty!");
    }else if(this.editRecordMoney.indexOf('-')!=-1){
      alert("Money must be a positive number!");
    }else if(isNaN(parseFloat(this.editRecordMoney))){
      alert("Money must be a valid number!");
    }else if(this.editRecordOutcome == null){
      alert("Record must have a type of outcome or income!");
    }else if(this.editRecordCatogory == null){
      alert("Catogory can not be empty!");
    }else{
      //call two API: editRecord  getAllRecords
      //后端需要传正数money or 负数？
      var cid;
      for(var i=0;i<this.categories.length;i++){
        if(this.editRecordCatogory == this.categories[i].name){
          cid = this.categories[i].id;
          break;
        }
      }
      console.log(this.editRecordMoney);
      var money;
      if(this.editRecordMoney.indexOf('.')!=-1 && (this.editRecordMoney.indexOf('.')+3)<this.editRecordMoney.length){
        money = this.editRecordMoney.substring(0,this.editRecordMoney.indexOf(".")+3);
      }else{
        money = this.editRecordMoney;
      }
      var edit_record = {
        note: this.editRecordNote,
        outcome: Boolean(this.editRecordOutcome=='Outcome'),
        money: parseFloat(money),
        date: this.editRecordDate.getFullYear() + '/' + (this.editRecordDate.getMonth()+1) + '/' + this.editRecordDate.getDate(),
        id: id,
        categoryId: cid
      };
        this.service.updateRecord(id,edit_record,this.bsRangeValue[0].getFullYear() + '/' + (this.bsRangeValue[0].getMonth()+1) + '/' + this.bsRangeValue[0].getDate(), 
                              this.bsRangeValue[1].getFullYear() + '/' + (this.bsRangeValue[1].getMonth()+1) + '/' + this.bsRangeValue[1].getDate())
                              .subscribe((data) => {
        this.catogories = data;
        console.log(data);
        console.log(this.catogories);
        });
        this.modalRef.hide();
    }
  }

}





