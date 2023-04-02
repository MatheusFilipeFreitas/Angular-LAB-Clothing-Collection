import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  userName!: string;

  constructor(private router: Router) {

  }
  ngOnInit(): void {
    this.getNameFromLocalStorage();
  }

  getNameFromLocalStorage(): void {
    this.userName = localStorage.getItem('userName')!;
  }

  logout(): void {
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}
