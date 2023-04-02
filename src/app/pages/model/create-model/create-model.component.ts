import { IModel } from './../../../models/model';
import { IAlert } from './../../../models/alert';
import { AlertService } from 'src/app/services/alert.service';
import { ICollection } from 'src/app/models/collection';
import { ModelService } from './../../../services/model.service';
import { CollectionService } from './../../../services/collection.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ERROR, SUCCESS } from 'src/app/common/alert-state';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-model',
  templateUrl: './create-model.component.html',
  styleUrls: ['./create-model.component.scss']
})
export class CreateModelComponent implements OnInit {

  modelCreateForm!: FormGroup;
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

  createForm(): void {
    this.modelCreateForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      accountable: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      type: new FormControl('', [Validators.required]),
      collection: new FormControl('', [Validators.required]),
      embroidery: new FormControl(null, [Validators.required]),
      stamped: new FormControl(null, [Validators.required]),
    });
  }

  get name() {
    return this.modelCreateForm.get('name');
  }

  get accountable() {
    return this.modelCreateForm.get('accountable');
  }

  get type() {
    return this.modelCreateForm.get('type');
  }

  get collection() {
    return this.modelCreateForm.get('collection');
  }

  get embroidery() {
    return this.modelCreateForm.get('embroidery');
  }

  get stamped() {
    return this.modelCreateForm.get('stamped');
  }

  createModel(): Boolean {
    const model = this.createObjectModel();

    try {
      this.modelService.createModel(model).subscribe({
        next: (r) => this.modelSuccessAlert(r),
        error: (e) => this.modelErrorAlert()
      })
    } catch (error) {
      this.modelErrorAlert();
      return false;
    }
    this.modelCreateForm.reset();
    return true;
  }

  getCollections(): void {
    try {
      this.collectionService.getAllCollections().subscribe((collections) => {
        this.collections = collections;
      });
    } catch (error) {
      this.collectionErrorAlert();
    }
  }

  createObjectModel(): IModel {
    return {
      name: this.name?.value,
      accountable: this.accountable?.value,
      type: this.type?.value,
      collection: this.collection?.value,
      embroidery: this.embroidery?.value == 'yes',
      stamped: this.stamped?.value == 'yes',
    }
  }

  onSubmit(): void {
    if (this.modelCreateForm.valid && (this.modelCreateForm.value.collection != '' && this.modelCreateForm.value.type != '')) {
      this.createModel();
    } else {
      this.inputsBlankAlert();
    }
  }

  cancel(): void {
    this.router.navigate(['/models']);
  }

  modelSuccessAlert(result: any): void {
    if (result.name) {
      this.alertMessage = {
        title: '',
        message: 'Modelo cadastrado com sucesso!',
        typeAlert: SUCCESS,
      }
      this.alertService.showGenericAlert(this.alertMessage);
    } else {
      this.alertMessage = {
        title: 'Ocorreu um erro ao cadastrar um Modelo',
        message: 'Entrar em contato com o administrador do sistema.',
        typeAlert: ERROR,
      }
    }
  }

  modelErrorAlert(): void {
    this.alertMessage = {
      title: 'Ocorreu um erro ao cadastrar o Modelo',
      message: 'Entrar em contato com o administrador do sistema.',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }

  collectionErrorAlert(): void {
    this.alertMessage = {
      title: 'Ocorreu um erro ao resgatar as Coleções',
      message: 'Entrar em contato com o administrador do sistema.',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }

  inputsBlankAlert() {
    this.alertMessage = {
      title: '',
      message: 'Preencha os campos',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }
}
