import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  loginMode = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged in successfully');
    }, error => {
      console.log('Failed to login');
    });
    this.loginToggle();
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  loginToggle() {
    this.loginMode = !this.loginMode;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }

}
