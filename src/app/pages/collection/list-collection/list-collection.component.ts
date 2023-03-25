import { Component } from '@angular/core';

@Component({
  selector: 'app-list-collection',
  templateUrl: './list-collection.component.html',
  styleUrls: ['./list-collection.component.scss']
})
export class ListCollectionComponent {
  collections: any[] = [
    {
      collection: "Adidas",
      accountable: "Yan Esteves",
      season: "Inverno 2023",
      models: 10,
      budget: 9500
    },
    {
      collection: "Renner",
      accountable: "Yan Esteves",
      season: "Inverno 2023",
      models: 10,
      budget: 3500
    },
    {
      collection: "PatBO",
      accountable: "Yan Esteves",
      season: "Inverno 2023",
      models: 10,
      budget: 8700
    },
    {
      collection: "Nike",
      accountable: "Yan Esteves",
      season: "Inverno 2023",
      models: 10,
      budget: 9100
    },
    {
      collection: "Pollo",
      accountable: "Yan Esteves",
      season: "Inverno 2023",
      models: 10,
      budget: 10000
    },
]
}
