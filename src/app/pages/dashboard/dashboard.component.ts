import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  biggerBudgets: any[] = [
    {
      collection: "Adidas",
      accountable: "Yan Esteves",
      model: 10,
      budget: 9500
    },
    {
      collection: "Renner",
      accountable: "Yan Esteves",
      model: 10,
      budget: 3500
    },
    {
      collection: "PatBO",
      accountable: "Yan Esteves",
      model: 10,
      budget: 8700
    },
    {
      collection: "Nike",
      accountable: "Yan Esteves",
      model: 10,
      budget: 9100
    },
    {
      collection: "Pollo",
      accountable: "Yan Esteves",
      model: 10,
      budget: 10000
    },
]
}
