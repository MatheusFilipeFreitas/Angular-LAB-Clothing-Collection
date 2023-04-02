import { AlertService } from './../../../services/alert.service';
import { IAlert } from './../../../models/alert';
import { CollectionService } from './../../../services/collection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ICollection } from 'src/app/models/collection';
import { ERROR, SUCCESS } from 'src/app/common/alert-state';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.scss']
})
export class EditCollectionComponent implements OnInit {

  currentId: number = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
  collectionEditForm!: FormGroup;
  alertMessage!: IAlert;
  collection: ICollection = {
    name: '',
    accountable: '',
    season: '',
    brand: '',
    budget: 0,
    release: ''
  }

  constructor(private activeRoute: ActivatedRoute, private router: Router, private collectionService: CollectionService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.getCollection();
    this.createForm();
  }

  getCollection(): void {
    try {
      this.collectionService.getCollection(this.currentId).subscribe((collection) => {
        this.collection = collection;
        this.collectionEditForm.patchValue({
          name: collection.name,
          accountable: collection.accountable,
          season: collection.season,
          brand: collection.brand,
          budget: collection.budget,
          release: collection.release
        });
      })

    } catch (error) {
      this.collectionGetErrorAlert();
    }
  }

  updateCollection(): void {
    const collection = this.createCollectionObject();
    try {
      this.collectionService.updateCollection(this.currentId, collection).subscribe({
        next: (v) => this.collectionSuccessAlert(v),
      });
    } catch (error) {
      this.collectionErrorAlert();
    }
  }

  createForm(): void {
    this.collectionEditForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      accountable: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      season: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      brand: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      budget: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      release: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    });
  }

  deleteCollection(): void {
    try {
      this.collectionService.deleteCollection(this.currentId).subscribe({
        next: () => this.collectionSuccessfullyDeletedAlert(),
        complete: () => this.router.navigate(['/collections'])
      });
    } catch (error) {
      this.collectionDeleteErrorAlert();
    }
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

  createCollectionObject(): ICollection {
    return {
      id: this.collection.id,
      name: this.name?.value,
      accountable: this.accountable?.value,
      season: this.season?.value,
      brand: this.brand?.value,
      budget: this.budget?.value,
      release: this.budget?.value
    }
  }

  onSubmit(): void {
    if (this.collectionEditForm.valid) {
      this.updateCollection();
    } else {
      this.inputsBlankErrorAlert();
    }
  }

  cancel(): void {
    this.router.navigate(['/collections']);
  }

  delete(): void {
    this.deleteCollection();
  }

  collectionSuccessAlert(result: any): void {
    if (result.name) {
      this.alertMessage = {
        title: '',
        message: 'Coleção atualizada com sucesso!',
        typeAlert: SUCCESS,
      }
      this.alertService.showGenericAlert(this.alertMessage);
    } else {
      this.alertMessage = {
        title: 'Ocorreu um erro ao atualizar a Coleção',
        message: 'Entrar em contato com o administrador do sistema.',
        typeAlert: ERROR,
      }
    }
  }

  collectionSuccessfullyDeletedAlert(): void {
    this.alertMessage = {
      title: '',
      message: 'Coleção deletada com sucesso!',
      typeAlert: SUCCESS,
    }
    this.alertService.showGenericAlert(this.alertMessage);
  }

  collectionErrorAlert(): void {
    this.alertMessage = {
      title: 'Ocorreu um erro ao atualizar a Coleção',
      message: 'Entrar em contato com o administrador do sistema. 222',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }

  collectionGetErrorAlert(): void {
    this.alertMessage = {
      title: 'Ocorreu um erro ao resgatar a Coleção',
      message: 'Entrar em contato com o administrador do sistema.',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }

  collectionDeleteErrorAlert(): void {
    this.alertMessage = {
      title: 'Ocorreu um erro ao deletar a Coleção',
      message: 'Entrar em contato com o administrador do sistema.',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }

  inputsBlankErrorAlert(): void {
    this.alertMessage = {
      title: '',
      message: 'Preencha os campos',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }

}
