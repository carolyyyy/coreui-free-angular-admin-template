import { Component } from '@angular/core';

@Component({
  selector: 'demo-accordion-opened',
  templateUrl: 'home.component.html'
})
export class HomeComponent {

  constructor() { }

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
//   months = [1,2,3,4,5,6,7,8,9,10,11,12];
   month = new Date().getMonth()+1;
   year = new Date().getFullYear();

  catogories = [
    {
      name: 'Utilities',
      money: 1010.23,
      records: [
        {
          name: 'book',
          money: 10.23,
          date: '2020/09/12'
        },
        {
          name: 'printer',
          money: 1000.00,
          date: '2020/09/12'
        }
      ]
    },
    {
      name: 'travel',
      money: 2000.00,
      records: [
        {
          name: 'traffic',
          money: 1000.00,
          date: '2020/09/12'
        },
        {
          name: 'hotel',
          money: 1000.00,
          date: '2020/09/12'
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

}




