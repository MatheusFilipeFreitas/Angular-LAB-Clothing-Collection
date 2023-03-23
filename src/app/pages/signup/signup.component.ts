import { UserService } from './../../services/user.service';
import { IUser } from './../../models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

// TODO: see how to use reactive forms for validation
// TODO: verify if the user is already registered
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  user!: IUser;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.minLength(8)]),
      enterprise: new FormControl('',[Validators.required, Validators.minLength(2)]),
      cnpj: new FormControl('',[Validators.required, Validators.minLength(14)]),
      email: new FormControl('',[Validators.required, Validators.minLength(8)]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
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

  onSubmit() {
    if(this.registerForm.valid) {
      this.createObjectUser();
      this.userService.createUser(this.user);
    }    
  }
  createObjectUser() {
    this.user.name = this.name?.value;
    this.user.enterprise = this.enterprise?.value;
    this.user.cnpj = this.cnpj?.value;
    this.user.email = this.email?.value;
    this.user.password = this.password?.value;
  }
}
