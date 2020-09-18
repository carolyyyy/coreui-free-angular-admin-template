import { Component } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
@Component({
  templateUrl: 'charts.component.html'
})
export class ChartsComponent {

    // Pie
    public pieChartLabels: string[] =['','','','','','']
    public pieChartData: number[] =[0,0,0,0,0,0]
    public pieChartType = 'pie';

    private url='http://6d4703ac.cpolar.io/';
       
    constructor(private httpclient:HttpClient){
      this.getRecordList()
    }

    //get the expense for each category
    getRecordList(){
      this.httpclient.get(this.url + '/record/getCategoryDetail?start=2020/09/01&end=2020/09/31').subscribe(item=>{ 
    
        this.pieChartLabels=new Array();
        this.pieChartData=new Array();
        
        Object.entries(item).forEach(([key, value]) => {
          if(value["money"]<0){                      
            this.pieChartLabels.push(value["name"])
            this.pieChartData.push(Math.abs(value["money"]))
          }
        });

        console.log(this.pieChartLabels)
        console.log(this.pieChartData)
          
      },
      error=>{
         console.log(error);
      });    
    }
}

