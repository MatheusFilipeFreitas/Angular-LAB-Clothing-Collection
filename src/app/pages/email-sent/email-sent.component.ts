import { UserService } from './../../services/user.service';
import { IUser } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-sent',
  templateUrl: './email-sent.component.html',
  styleUrls: ['./email-sent.component.scss']
})
export class EmailSentComponent implements OnInit{

  user!: IUser;

  constructor(private router: Router ,private userService: UserService, private activateRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.getUser(params['id']);
    });
  }

  getUser(id: number): void {
    this.userService.getUser(id).subscribe((user) => {
      this.user = user;
    })
  }

  onSubmit() {
    this.router.navigate(['/login']);
  }

}
