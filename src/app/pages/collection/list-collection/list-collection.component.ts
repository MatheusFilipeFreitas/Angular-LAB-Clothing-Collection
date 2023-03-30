import { AlertService } from './../../../services/alert.service';
import { IAlert } from './../../../models/alert';
import { IModel } from './../../../models/model';
import { ModelService } from './../../../services/model.service';
import { ICollection } from './../../../models/collection';
import { CollectionService } from './../../../services/collection.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ERROR } from 'src/app/common/alert-state';

@Component({
  selector: 'app-list-collection',
  templateUrl: './list-collection.component.html',
  styleUrls: ['./list-collection.component.scss']
})

export class ListCollectionComponent implements OnInit {
  collections: ICollection[] = [];
  models!: IModel[];
  alertMessage!: IAlert;
  collectionWithModelQuantity: any[] = [];

  constructor(private router: Router, private collectionService: CollectionService, private modelService: ModelService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections() {
    try{
      this.collectionService.getAllCollections().subscribe((collections) => {
        this.collections = collections!;
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


  redirectToCreateCollection() {
    this.router.navigate(['/collections/create'])
  }

  redirectToUpdate(id?: number) {
    this.router.navigate(['/collections/update/' + id]);
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
