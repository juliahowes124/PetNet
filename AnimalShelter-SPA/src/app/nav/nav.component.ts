import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  loginMode = false;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/animals']);
    });
    this.loginToggle();
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  loginToggle() {
    this.loginMode = !this.loginMode;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

}
