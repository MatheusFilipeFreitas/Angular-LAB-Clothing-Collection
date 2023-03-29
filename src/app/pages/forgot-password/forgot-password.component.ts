import { Router } from '@angular/router';
import { IUser } from './../../models/user';
import { UserService } from './../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit{

  passwordRecoveryForm!: FormGroup;
  userList!: IUser[];
  userFound!: IUser;

  constructor(private router: Router,private userService: UserService) {

  }

  ngOnInit(): void {
    this.getUsersList();
    this.createForm();
  }

  getUsersList() {
    this.userService.getAllUsers().subscribe((users) => {
      this.userList = users;
    });
  }

  createForm() {
    this.passwordRecoveryForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(8)])
    });
  }

  get email() {
    return this.passwordRecoveryForm.get('email');
  }

  findEmailInUserList(): Boolean {
    this.userFound = this.userList.find((user) => {
      return user.email == this.email?.value;
    })!;
    if(this.userFound == undefined) {
      return false;
    }
    return true;
  }

  onSubmit() {
    const result = this.findEmailInUserList();
    if(!result) {

    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

}
