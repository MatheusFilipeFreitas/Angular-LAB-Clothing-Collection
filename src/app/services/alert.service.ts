import { IAlert } from './../models/alert';
import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ERROR, INFO, QUESTION, SUCCESS, WARNING } from '../common/alert-state';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  private displayAlert(title: string, message: string, icon: SweetAlertIcon): void {
    Swal.fire(title, message, icon);
  }

  public displayDialog(alert: IAlert) {
    Swal.fire({
      title: alert.title,
      text: alert.message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Deletar'
    });
  }


  public showGenericAlert(alert: IAlert) {
    this.displayAlert(alert.title!, alert.message, alert.typeAlert!);
  }

  public displayInfo(alert: IAlert) {
    this.displayAlert(alert.title!, alert.message, INFO);
  }

  public displaySuccess(alert: IAlert) {
    this.displayAlert(alert.title!, alert.message, SUCCESS);
  }

  public displayError(alert: IAlert) {
    this.displayAlert(alert.title!, alert.message, ERROR);
  }

  public displayWarning(alert: IAlert) {
    this.displayAlert(alert.title!, alert.message, WARNING);
  }

  public displayQuestion(alert: IAlert) {
    this.displayAlert(alert.title!, alert.message, QUESTION);
  }


}
