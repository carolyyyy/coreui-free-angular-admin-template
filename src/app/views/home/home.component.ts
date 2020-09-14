import { SelectorMatcher } from '@angular/compiler';
import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Category} from './Category';
import {ServiceService} from './service.service';

@Component({
  selector: 'demo-accordion-opened',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit{

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private service: ServiceService, private httpClient: HttpClient) {

  }

  categories: Category[] = [];

  ngOnInit() {
   
    //console.log(this.results);
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
   bsRangeValue: Date[] = [this.firstDate, this.secondDate];

   addNote: string;
   addMoney: string;
   addOutcome: string;
   addDate: Date = new Date();
   addCatogory: string;

   addCatogoryName: string;
   editCatogorySelectName: string;
   editCatogoryName: string;
   deleteCatogoryName: string;

   editRecordNote: string;
   editRecordMoney: string;
   editRecordOutcome: string;
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
          isOutcome: true,
          date: new Date('2020/9/12')
        },
        {
          note: 'printer',
          money: -1000.00,
          isOutcome: true,
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
          isOutcome: true,
          date: new Date('2020/9/12')
        },
        {
          note: 'hotel',
          money: -1000.00,
          isOutcome: true,
          date: new Date('2020/9/12')
        }
      ]
    }
  ]

  // categories = [{
  //   id: 1,
  //   name: 'Utilities'
  // },{
  //   id: 2,
  //   name: 'Travel'
  // }]

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

  openModalWithEditRecord(template: TemplateRef<any>, recordNote: string, recordMoney: string, recordOutcome: boolean, recordDate: Date, recordCatogory: string) {
    this.modalRef = this.modalService.show(template);
    console.log(recordNote);
    console.log(recordMoney);
    if(recordOutcome){
      this.editRecordOutcome = 'Outcome';
    }else{
      this.editRecordOutcome = 'Income';
    }
    
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

  confirm(recordNote: string, recordMoney: string, recordOutcome: boolean, recordDate: Date, recordCatogory: string): void {
    // this.message = 'Confirmed!';
    //call delRecord getAllRecords
    this.modalRef.hide();
    for(var i=0;i<this.catogories.length;i++){
      if(this.catogories[i].name == recordCatogory){

      }
    }
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
    }else if(isNaN(parseFloat(this.addMoney))){
      alert("Money must be a valid number!");
    }else if(this.addOutcome == null){
      alert("Record must have a type of outcome or income!");
    }else if(this.addCatogory == null){
      alert("Catogory can not be empty!");
    }else{
      //call addRecord getAllRecords
      for(var i=0;i<this.catogories.length;i++){
        if(this.catogories[i].name == this.addCatogory){
          this.catogories[i].records.push({
            note: this.addNote,
            isOutcome: Boolean(this.addOutcome=='Outcome'),
            money: parseFloat(this.addMoney.substring(0,this.addMoney.indexOf(".")+3)),
            date: this.addDate})
            this.modalRef.hide();
            this.addNote = null;
            this.addMoney = null;
            this.addOutcome = null;
            this.addDate = new Date();
            this.addCatogory = null;
            break;
        }
      }
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
      this.service.addCategory({name} as Category).subscribe();
      this.findCategoryList();
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

  editRecordFunction(){
    if(this.editRecordNote == null){
      alert("Note can not be empty!");
    }else if(this.editRecordMoney == null){
      alert("Money can not be empty!");
    }else if(isNaN(parseFloat(this.editRecordMoney))){
      alert("Money must be a valid number!");
    }else if(this.editRecordOutcome == null){
      alert("Record must have a type of outcome or income!");
    }else if(this.editRecordCatogory == null){
      alert("Catogory can not be empty!");
    }else{
      //call two API: editRecord  getAllRecords
      
    }
  }

}





