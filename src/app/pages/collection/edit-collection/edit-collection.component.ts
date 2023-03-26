import { CollectionService } from './../../../services/collection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ICollection } from 'src/app/models/collection';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.scss']
})
export class EditCollectionComponent implements OnInit {

  currentId: number = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
  collectionEditForm!: FormGroup;
  collection: ICollection = {
    name: '',
    accountable: '',
    season: '',
    brand: '',
    budget: 0,
    release: '',
    models: 0
  }

  constructor(private activeRoute: ActivatedRoute ,private router: Router, private collectionService: CollectionService) {

  }

  ngOnInit(): void {
    // this.getCollection();
    this.createForm();
  }

  createForm() {
    this.collectionEditForm = new FormGroup({
      name: new FormControl(null,[Validators.required, Validators.minLength(3)]),
      accountable: new FormControl(null,[Validators.required, Validators.minLength(3)]),
      season: new FormControl(null,[Validators.required, Validators.minLength(3)]),
      brand: new FormControl(null,[Validators.required, Validators.minLength(3)]),
      budget: new FormControl(null,[Validators.required, Validators.minLength(3)]),
      release: new FormControl(null,[Validators.required, Validators.minLength(3)]),
    });
  }

  get name() {
    return this.collectionEditForm.get('name');
  }

  get accountable() {
    return this.collectionEditForm.get('accountable');
  }

  get season() {
    return this.collectionEditForm.get('season');
  }

  get brand() {
    return this.collectionEditForm.get('brand');
  }

  get budget() {
    return this.collectionEditForm.get('budget');
  }

  get release() {
    return this.collectionEditForm.get('release');
  }

  onSubmit() {
    console.log(this.collection);
  }

  cancel() {
    this.router.navigate(['/collections']);
  }
}
