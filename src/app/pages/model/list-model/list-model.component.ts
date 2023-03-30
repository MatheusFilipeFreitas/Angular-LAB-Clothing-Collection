import { ICollection } from 'src/app/models/collection';
import { CollectionService } from './../../../services/collection.service';
import { ModelService } from './../../../services/model.service';
import { IModel } from './../../../models/model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-model',
  templateUrl: './list-model.component.html',
  styleUrls: ['./list-model.component.scss']
})
export class ListModelComponent {
  models!: IModel[];
  collections!: ICollection[];

  constructor(private router: Router, private modelService: ModelService, private collectionService: CollectionService) {

  }

  ngOnInit(): void {
    this.getListOfModels();
    this.getListOfCollections();
  }

  getListOfModels() {
    this.modelService.getAllModels().subscribe((models) => {
      this.models = models;
    });
  }

  getListOfCollections() {
    this.collectionService.getAllCollections().subscribe((colletions) => {
      this.collections = colletions;
    })
  }

  getCollectionName(id: number) {
    return this.collections.find((collection) => collection.id === id)?.name;
  }

  redirectToCreateModel() {
    this.router.navigate(['/models/create'])
  }

  redirectToUpdate(id?: number) {
    this.router.navigate(['/models/update/'+ id]);
  }
}
