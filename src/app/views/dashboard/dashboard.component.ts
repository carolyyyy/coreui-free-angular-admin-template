import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { stringify } from 'querystring';
import { catchError } from 'rxjs/operators';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  modalRef: BsModalRef;
  Budget:number
  Income:number
  Expense:number
  Account:number
  list:any
  private submitted:boolean
  private budgetJ={
    date:"",
    money:0
  }
  budgetId:number
  //Date Picker
  secondDate: Date = new Date();
  firstDate: Date = new Date(this.secondDate.getFullYear(),this.secondDate.getMonth(),1);
  bsRangeValue: Date[];
  
  // Pie chart
  pieChartLabels: string[] = ['Used Budget', 'Remained Budget'];
  pieChartData: number[] = [0, 100];
  pieChartType = 'pie';

  //private URI
  private Url = 'http://6d4703ac.cpolar.io/';
  //private url = 'http://5ab408a3.cpolar.io/home';

  private httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json'})
  };
  
  constructor(private modalService: BsModalService, private httpClient: HttpClient) {
    this.test();
    this.bsRangeValue = [this.firstDate, this.secondDate]
    this.submitted=false
    //console.log(JSON.parse(this.budgetJson))
    
    console.log(JSON.stringify(this.budgetJ))
    console.log(typeof(JSON.stringify(this.budgetJ)))
  }
  
  //open the custom template
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
 
  dateChange(value: Date[]){
    this.bsRangeValue = value;
    this.budgetJ.date=this.bsRangeValue[0].getFullYear() + '/' + (this.bsRangeValue[0].getMonth()+1) + '/' + this.bsRangeValue[0].getDate();
    this.getValue(this.budgetJ.date, 
    this.bsRangeValue[1].getFullYear() + '/' + (this.bsRangeValue[1].getMonth()+1) + '/' + this.bsRangeValue[1].getDate())

  }
 
  getValue(start: string, end: string){
    this.httpClient.get(this.Url + '/record/getIncomeAndOutcomeAndBudget?date='+end).subscribe(item=>{        
              console.log(item)
              this.Budget=item["budget"]
              this.Income=item["income"]
              this.Expense=item["outcome"]
              this.Account=this.Income-this.Expense
              this.pieChartData=[this.Expense,this.Budget-this.Expense];
           },
           error=>{
             console.log(error);
           });    


  }

  
  //submit a new budget
  submitBudget(){
    this.budgetJ.money=this.Budget;

    this.httpClient.get(this.Url+'/budget/getBudgetByDate?date='+this.budgetJ.date).subscribe(data=>{
      console.log("get the value")
      if(data!=null) {
        this.submitted=true;
        this.budgetId=data["id"]
        console.log("id")
        console.log(this.submitted)
      }
      
    })
    //update the budget amount
    if(this.submitted){
      console.log("update data")
        this.httpClient.put(this.Url + '/budget/modifyMoney/'+this.budgetId+'?money='+this.budgetJ.money, this.httpOptions)
        .subscribe(data => {
          
          console.log(data)
        });
        this.updateBudget()
      this.submitted=false
    }
    if(!this.submitted){
      this.httpClient.post(this.Url + '/budget', JSON.stringify(this.budgetJ), this.httpOptions)
      .subscribe(data => {
        console.log(data)
      });
      this.addBudget();
    }
    this.editRecordFunctionClose();
  }

  updateBudget(){
    this.httpClient.put(this.Url + '/budget/modifyMoney/'+this.budgetId+'?money='+this.budgetJ.money, this.httpOptions)
    .subscribe(data => {
      
      console.log(data)
    });
  this.submitted=false
  }
  addBudget(){
    this.httpClient.post(this.Url + '/budget', JSON.stringify(this.budgetJ), this.httpOptions)
      .subscribe(data => {
        console.log(data)
      });
  }

  //testing 
  test(){
    this.httpClient.get(this.Url + '/category').subscribe(item=>{
    // this.httpClient.get(this.url).subscribe(item=>{
            this.list=item
            //console.log("dsdsd")
            // console.log(item["summary"]);
          },
          error=>{
            console.log(error);
          });    
  }

  //close the template
  editRecordFunctionClose(){

    this.modalRef.hide();
    this.pieChartData=[this.Expense,this.Budget-this.Expense];
  }

  ngOnInit(): void { 
  }
}
