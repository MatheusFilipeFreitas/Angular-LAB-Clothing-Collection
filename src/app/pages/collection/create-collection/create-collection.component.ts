import { ICollection } from './../../../models/collection';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CollectionService } from './../../../services/collection.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.scss']
})
export class CreateCollectionComponent implements OnInit {
  collectionCreateForm!: FormGroup;
  collection!: ICollection;

  constructor(private router: Router, private collectionService: CollectionService) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.collectionCreateForm = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.minLength(3)]),
      accountable: new FormControl('',[Validators.required, Validators.minLength(3)]),
      season: new FormControl('',[Validators.required, Validators.minLength(3)]),
      brand: new FormControl('',[Validators.required, Validators.minLength(3)]),
      budget: new FormControl('',[Validators.required, Validators.minLength(3)]),
      release: new FormControl('',[Validators.required, Validators.minLength(3)]),
    });
  }

  get name() {
    return this.collectionCreateForm.get('name');
  }

  get accountable() {
    return this.collectionCreateForm.get('accountable');
  }

  get season() {
    return this.collectionCreateForm.get('season');
  }

  get brand() {
    return this.collectionCreateForm.get('brand');
  }

  get budget() {
    return this.collectionCreateForm.get('budget');
  }

  get release() {
    return this.collectionCreateForm.get('release');
  }

  onSubmit() {
    if(this.collectionCreateForm.valid){
      this.createCollection();
      this.collectionService.createCollection(this.collection);
    }
  }

  createCollection() {
    this.collection.name = this.name?.value;
    this.collection.accountable = this.accountable?.value;
    this.collection.season = this.season?.value;
    this.collection.brand = this.brand?.value;
    this.collection.budget = this.budget?.value;
    this.collection.release = this.release?.value;
  }

  cancel() {
    this.router.navigate(['/collections']);
  }



}
