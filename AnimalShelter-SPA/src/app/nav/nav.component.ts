import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  loginMode = false;
  userId: number;
  photoUrl: string;
  messages: number;
  drawerToggle = false;
  mobile: boolean;

  constructor(public authService: AuthService, private alertify: AlertifyService,
              private router: Router, private userService: UserService) { }

  ngOnInit() {

    if (window.screen.width < 361) { // 768px portrait
      this.mobile = true;
    }
    console.log(window.screen.width);

    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    if (this.authService.decodedToken !== undefined) {
      this.userService.getMessages(this.authService.decodedToken.nameid, 1, 1, 'Unread').subscribe(data => {
        this.messages = data.pagination.totalItems;
      });
    }
  }


  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
      this.router.navigate(['/animals']);
      this.userService.getMessages(this.authService.decodedToken.nameid, 1, 1, 'Unread').subscribe(data => {
        this.messages = data.pagination.totalItems;
      });
    }, error => {
      this.alertify.error(error);
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
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.authService.currentPhotoUrl = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

  openDrawer() {
    this.drawerToggle = true;
  }

  closeDrawer() {
    this.drawerToggle = false;
  }

}
