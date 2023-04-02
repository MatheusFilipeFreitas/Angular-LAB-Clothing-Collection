import { AlertService } from './../../services/alert.service';
import { IAlert } from './../../models/alert';
import { UserService } from './../../services/user.service';
import { IUser } from './../../models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ERROR, SUCCESS } from 'src/app/common/alert-state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  alertMessage!: IAlert;
  userList!: IUser[];

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.getUsersList();
    this.createRegisterForm();
  }

  createRegisterForm(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      enterprise: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      cnpj: new FormControl(null, [Validators.required, Validators.minLength(14)]),
      email: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  get name() {
    return this.registerForm.get('name');
  }

  get enterprise() {
    return this.registerForm.get('enterprise');
  }

  get cnpj() {
    return this.registerForm.get('cnpj');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  getUsersList(): void {
    try {
      this.userService.getAllUsers().subscribe((users) => {
        this.userList = users;
      });
    } catch (error) {
      this.userErrorAlert();
    }
  }

  userFoundInList(userToFind: IUser): Boolean {
    const found = this.userList.find((user) => {
      return user.email === userToFind.email;
    });
    return !(found == undefined);
  }

  samePasswordInInputs(): Boolean {
    if (this.confirmPassword === this.password) {
      return true;
    }
    return false;
  }

  createUser(): Boolean {
    const user = this.createObjectUser();

    if (this.userFoundInList(user)) {
      this.userAlreadyExistsAlert();
      return false;
    }

    if (!this.samePasswordInInputs()) {
      this.passwordIsNotTheSameAlert();
      return false;
    }

    try {
      this.userService.createUser(user).subscribe({
        next: (r) => this.userSuccessAlert(r),
        error: (e) => this.userErrorAlert(),
        complete: () => this.router.navigate(['/login']),
      });
    } catch (error) {
      this.userErrorAlert();
      return false;
    }
    return true;
  }

  createObjectUser(): IUser {
    return {
      name: this.name?.value,
      enterprise: this.enterprise?.value,
      cnpj: this.cnpj?.value,
      email: this.email?.value,
      password: this.password?.value,
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.createUser();
    }
  }

  userSuccessAlert(result: any): void {
    if (result.name) {
      this.alertMessage = {
        title: '',
        message: 'Usuário cadastrado com sucesso!',
        typeAlert: SUCCESS,
      }
      this.alertService.showGenericAlert(this.alertMessage);
    } else {
      this.alertMessage = {
        title: 'Ocorreu um erro ao cadastrar o Usuário',
        message: 'Entrar em contato com o administrador do sistema.',
        typeAlert: ERROR,
      }
    }
  }

  userErrorAlert(): void {
    this.alertMessage = {
      title: 'Ocorreu um erro ao cadastrar o Usuário',
      message: 'Entrar em contato com o administrador do sistema.',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }

  userAlreadyExistsAlert(): void {
    this.alertMessage = {
      title: '',
      message: 'O e-mail já foi cadastrado',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }

  passwordIsNotTheSameAlert(): void {
    this.alertMessage = {
      title: '',
      message: 'As senhas não correspondem',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }
}
