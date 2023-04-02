import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ERROR, SUCCESS } from 'src/app/common/alert-state';
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

  currentId: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private collectionService: CollectionService, private modelService: ModelService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.getCollections();
    this.getModelById();
    this.createForm();
  }

  getCollections(): void {
    try {
      this.collectionService.getAllCollections().subscribe((collections) => {
        this.collections = collections;
      });
    } catch (error) {
      this.collectionsGetErrorAlert();
    }
  }

  getModelById(): void {
    try {
      this.modelService.getModel(this.currentId).subscribe((model) => {
        this.model = model;
        this.modelEditForm.patchValue({
          name: model.name,
          accountable: model.accountable,
          type: model.type,
          collection: model.collection,
          embroidery: (model.embroidery) ? 'yes' : 'no',
          stamped: (model.stamped) ? 'yes' : 'no',
        })
      })
    } catch (error) {
      this.modelGetErrorAlert()
    }
  }

  updateModel(): void {
    const model = this.createObjectModel();
    try {
      this.modelService.updateModel(this.currentId, model).subscribe({
        next: (v) => this.modelSuccessAlert(v),
      });
    } catch (error) {
      this.modelUpdateErrorAlert();
    }
  }

  deleteModel(): void {
    try {
      this.modelService.deleteModel(this.currentId).subscribe({
        next: () => this.modelErrorAlert(),
        complete: () => this.router.navigate(['/models'])
      });
    } catch (error) {
      this.modelDeleteErrorAlert();
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

  createForm(): void {
    this.modelEditForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      accountable: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      type: new FormControl('', [Validators.required]),
      collection: new FormControl('', [Validators.required]),
      embroidery: new FormControl(null, [Validators.required]),
      stamped: new FormControl(null, [Validators.required]),
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


  onSubmit(): void {
    if (this.modelEditForm.valid && (this.modelEditForm.value.collection != '' && this.modelEditForm.value.type != '')) {
      this.updateModel();
    } else {
      this.inputsBlankAlert();
    }
  }

  cancel(): void {
    this.router.navigate(['/models']);
  }

  delete(): void {
    this.deleteModel();
  }

  modelSuccessAlert(result: any) {
    if (result.name) {
      this.alertMessage = {
        title: '',
        message: 'Modelo atualizado com sucesso!',
        typeAlert: SUCCESS,
      }
      this.alertService.showGenericAlert(this.alertMessage);
    } else {
      this.alertMessage = {
        title: 'Ocorreu um erro ao atualizar o Modelo',
        message: 'Entrar em contato com o administrador do sistema.',
        typeAlert: ERROR,
      }
    }
  }

  modelErrorAlert() {
    this.alertMessage = {
      title: '',
      message: 'Modelo deletado com sucesso!',
      typeAlert: SUCCESS,
    }
    this.alertService.showGenericAlert(this.alertMessage);
  }


  modelGetErrorAlert(): void {
    this.alertMessage = {
      title: 'Ocorreu um erro ao resgatar o Modelo',
      message: 'Entrar em contato com o administrador do sistema.',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }

  modelUpdateErrorAlert(): void {
    this.alertMessage = {
      title: 'Ocorreu um erro ao atualizar o Modelo',
      message: 'Entrar em contato com o administrador do sistema.',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }

  modelDeleteErrorAlert(): void {
    this.alertMessage = {
      title: 'Ocorreu um erro ao deletar o Modelo',
      message: 'Entrar em contato com o administrador do sistema.',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }

  collectionsGetErrorAlert(): void {
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
