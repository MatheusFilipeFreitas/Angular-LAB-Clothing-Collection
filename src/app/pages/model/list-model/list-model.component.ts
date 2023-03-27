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

  constructor(private router: Router, private modelService: ModelService) {

  }

  ngOnInit(): void {
    this.getListOfModels();
  }

  getListOfModels() {
    this.modelService.getAllModels().subscribe((models) => {
      this.models = models;

    });
  }

  redirectToCreateModel() {
    this.router.navigate(['/models/create'])
  }

  redirectToUpdate(id?: number) {
    this.router.navigate(['/models/update/'+ id]);
  }
}
