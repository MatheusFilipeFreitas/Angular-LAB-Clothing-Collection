import { AlertService } from './../../services/alert.service';
import { IAlert } from './../../models/alert';
import { IModel } from './../../models/model';
import { ICollection } from 'src/app/models/collection';
import { ModelService } from './../../services/model.service';
import { CollectionService } from './../../services/collection.service';
import { Component, OnInit } from '@angular/core';
import { ERROR } from 'src/app/common/alert-state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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

  collections!: ICollection[];
  models!: IModel[];
  alertMessage!: IAlert;
  collectionQuantity: number = 0;
  modelQuantity: number = 0;
  totalBudget: number = 0;

  constructor(private collectionService: CollectionService, private modelService: ModelService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.getCollections();
    this.getModels();
    this.sortingData();
  }

  getCollections() {
    try {
      this.collectionService.getAllCollections().subscribe((collections) => {
        this.collections = collections;
        this.collectionQuantity = collections.length;
        this.totalBudget = this.getTotalBudget(collections);
      })
    }catch(error) {
      this.resultErrorMessageCollections();
    }
  }

  getModels() {
    try {
      this.modelService.getAllModels().subscribe((models) => {
        this.models = models;
        this.modelQuantity = models.length;
      })
    }catch(error) {
      this.resultErrorMessageModels();
    }
  }

  sortingData() {
    this.biggerBudgets.sort((a, b) => {
      return b.budget - a.budget;
    })
  }

  getTotalBudget(collections: ICollection[]): number {
    let sum = 0;
    for(let collection of collections) {
      sum += collection.budget;
    }
    return sum/collections.length;
  }

  resultErrorMessageCollections(): void {
    this.alertMessage = {
      title: 'Ocorreu um erro ao resgatar as Coleçõess',
      message: 'Entrar em contato com o administrador do sistema.',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }

  resultErrorMessageModels(): void {
    this.alertMessage = {
      title: 'Ocorreu um erro ao resgatar os Modelos',
      message: 'Entrar em contato com o administrador do sistema.',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }
}
