import { IModel } from './../../../models/model';
import { ModelService } from './../../../services/model.service';
import { ICollection } from './../../../models/collection';
import { CollectionService } from './../../../services/collection.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-collection',
  templateUrl: './list-collection.component.html',
  styleUrls: ['./list-collection.component.scss']
})

export class ListCollectionComponent implements OnInit{
  collections!: ICollection[];
  models!: IModel[];
  collectionWithModelQuantity: any[] = [];

  constructor(private router: Router, private collectionService: CollectionService, private modelService: ModelService) {

  }

  ngOnInit(): void {
    this.getListOfCollections();
    this.getListOfModels();
    setTimeout(() => {
      this.collectionWithModelQuantity = this.getModelQuantityByCollection();
    }, 100);
  }

  getListOfCollections() {
    this.collectionService.getAllCollections().toPromise().then((collections) => {
      this.collections = collections!;
    });
  }

  getListOfModels() {
    this.modelService.getAllModels().subscribe((models) => {
      this.models = models;
    })
  }

  getModelQuantityByCollection() {
    const returnValue: any[] = [];
    this.collections.forEach((collection, i) => {
      const modelByCollection = this.models.filter(model => model.collection === collection.id);
      const object = {
        ...this.collections[i],
        modelsQuantity: modelByCollection.length
      }
      returnValue.push(object);
    })
    return returnValue;
  }

  redirectToCreateCollection() {
    this.router.navigate(['/collections/create'])
  }

  redirectToUpdate(id?: number) {
    this.router.navigate(['/collections/update/'+ id]);
  }
}
