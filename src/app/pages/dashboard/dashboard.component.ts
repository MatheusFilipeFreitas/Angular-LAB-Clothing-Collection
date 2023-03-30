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

  collections!: ICollection[];
  models!: IModel[];
  alertMessage!: IAlert;
  collectionQuantity: number = 0;
  modelQuantity: number = 0;
  totalBudget: number = 0;
  collectionWithModelQuantity: any[] = [];

  constructor(private collectionService: CollectionService, private modelService: ModelService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections() {
    try{
      this.collectionService.getAllCollectionsSorted().subscribe((collections) => {
        this.collections = collections!;
        this.collectionQuantity = collections.length;
        this.totalBudget = this.getTotalBudget(collections);
        this.getModels();
      });
    }catch(error) {
      this.resultErrorMessageModels();
    }
  }

  getModels() {
    try{
      this.modelService.getAllModels().subscribe((models) => {
        this.models = models;
        this.modelQuantity = models.length;
        this.collectionWithModelQuantity = this.getModelQuantityByCollection();
      });
    }catch(error) {
      this.resultErrorMessageModels();
    }
  }

  getModelQuantityByCollection() {
    return this.collections.map(collection => ({
      ...collection,
      modelsQuantity: this.models.filter(model => model.collection === collection.id).length
    }));
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
