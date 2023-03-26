import { IAlert } from './../../models/alert';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUser } from './../../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { ERROR } from 'src/app/common/alert-state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;
  listOfUsers!: IUser[];
  loginForm!: FormGroup;
  alertMessage!: IAlert;
  user: IUser = {
    name: '',
    enterprise: '',
    cnpj: '',
    email: '',
    password: ''
  };

  constructor(private alertService: AlertService, private router: Router, private userService: UserService) {

  }

  ngOnInit(): void {
    this.getUsersList();
    this.createLoginForm();
  }

  getUsersList(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.listOfUsers = users;
    })
  }

  createLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.minLength(8), Validators.email]),
      password: new FormControl(null,[Validators.required, Validators.minLength(8)])
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if(this.loginForm.valid) {
      if(this.findUserByEmailInList()) {
        if(this.passwordIsCorrect()){
          this.invalidLogin = false;
          this.createLocalStorage(this.user.name);
          this.router.navigate(['/dashboard']);
        }else{
          this.userAlreadyExistsErrorMessage();
        }
      }else {
        this.userAlreadyExistsErrorMessage();
      }

    }
  }

  passwordIsCorrect(): Boolean {
      return this.user.password == this.password?.value;
  }

  findUserByEmailInList(): Boolean {
    const userFound = this.listOfUsers.find(user => user.email == this.email?.value);
    if(userFound != undefined) {
      this.user = userFound;
      return true;
    }
    return false;
  }

  createLocalStorage(name: string): void {
    localStorage.setItem('userName', name);
  }

  userAlreadyExistsErrorMessage() {
    this.alertMessage = {
      title: '',
      message: 'E-mail ou senha inválidos',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }
}
