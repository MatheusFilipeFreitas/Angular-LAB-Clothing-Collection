import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAlert } from 'src/app/models/alert';
import { ICollection } from 'src/app/models/collection';
import { IModel } from 'src/app/models/model';
import { AlertService } from 'src/app/services/alert.service';
import { CollectionService } from 'src/app/services/collection.service';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-edit-model',
  templateUrl: './edit-model.component.html',
  styleUrls: ['./edit-model.component.scss']
})
export class EditModelComponent implements OnInit {

  modelEditForm!: FormGroup;
  listOfModelTypes = ['Bermuda', 'Biquini', 'Bolsa', 'Boné', 'Calça', 'Camisa', 'Chapéu', 'Saia'];
  collections: ICollection[] = [];
  alertMessage!: IAlert;
  model: IModel = {
    name: '',
    accountable: '',
    type: '',
    collection: 0,
    embroidery: false,
    stamped: false,
  }

  constructor(private router: Router, private collectionService: CollectionService, private modelService: ModelService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.getCollections();
    this.createForm();
  }

  createForm() {
    this.modelEditForm = new FormGroup({
      name: new FormControl(null,[Validators.required, Validators.minLength(3)]),
      accountable: new FormControl(null,[Validators.required, Validators.minLength(3)]),
      type: new FormControl('',[Validators.required]),
      collection: new FormControl('',[Validators.required]),
      embroidery: new FormControl(null,[Validators.required]),
      stamped: new FormControl(null,[Validators.required]),
    });
  }

  get name() {
    return this.modelEditForm.get('name');
  }

  get accountable() {
    return this.modelEditForm.get('accountable');
  }

  get type() {
    return this.modelEditForm.get('type');
  }

  get collection() {
    return this.modelEditForm.get('collection');
  }

  get embroidery() {
    return this.modelEditForm.get('embroidery');
  }

  get stamped() {
    return this.modelEditForm.get('stamped');
  }

  getCollections() {
    try {
      this.collectionService.getAllCollections().subscribe((collections) => {
        this.collections = collections;
      });
    }catch(error) {
      // this.resultErrorMessageColletion();
    }
  }

  onSubmit() {
    if(this.modelEditForm.valid && (this.modelEditForm.value.collection != '' && this.modelEditForm.value.type != '')) {
      // this.createModel();
    }else{
      // this.resultBlankInputsCollection();
    }
  }

  cancel() {
    this.router.navigate(['/models']);
  }

  delete() {

  }

}
