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

  constructor(private router: Router, private collectionService: CollectionService) {

  }

  ngOnInit(): void {
    this.getListOfCollections();
  }

  getListOfCollections() {
    this.collectionService.getAllCollections().subscribe((collections) => {
      this.collections = collections;
    });
  }

  redirectToCreateCollection() {
    this.router.navigate(['/collections/create'])
  }
}
