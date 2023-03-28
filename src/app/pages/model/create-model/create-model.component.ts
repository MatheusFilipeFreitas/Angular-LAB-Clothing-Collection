import { IAlert } from './../../../models/alert';
import { AlertService } from 'src/app/services/alert.service';
import { ICollection } from 'src/app/models/collection';
import { ModelService } from './../../../services/model.service';
import { CollectionService } from './../../../services/collection.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ERROR } from 'src/app/common/alert-state';

@Component({
  selector: 'app-create-model',
  templateUrl: './create-model.component.html',
  styleUrls: ['./create-model.component.scss']
})
export class CreateModelComponent implements OnInit {

  listOfModelTypes = ['Bermuda', 'Biquini', 'Bolsa', 'Boné', 'Calça', 'Camisa', 'Chapéu', 'Saia'];
  collections: ICollection[] = [];
  alertMessage!: IAlert;

  constructor(private router: Router, private collectionService: CollectionService, private modelService: ModelService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections() {
    try {
      this.collectionService.getAllCollections().subscribe((collections) => {
        this.collections = collections;
      });
    }catch(error) {
      this.resultErrorMessageColletion();
    }
  }


  resultErrorMessageColletion(): void {
    this.alertMessage = {
      title: 'Ocorreu um erro ao resgatar as Coleções',
      message: 'Entrar em contato com o administrador do sistema.',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }
}
