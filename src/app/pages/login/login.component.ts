import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUser } from './../../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;
  listOfUsers!: IUser[];
  user!: IUser;
  loginForm!: FormGroup;

  constructor(private router: Router, private userService: UserService) {

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
      email: new FormControl('',[Validators.required, Validators.minLength(8)]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if(this.findUserByEmailInList()) {
      if(this.passwordIsCorrect()){
        this.invalidLogin = false;
        console.log('login');
        this.createLocalStorage(this.user.name);
        this.router.navigate(['/dashboard']);
      }else{
        this.invalidLogin = true;
      }
    }else{
      this.invalidLogin = true;
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
}