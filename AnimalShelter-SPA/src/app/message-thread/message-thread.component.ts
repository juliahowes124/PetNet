import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from '../_models/user';
import { of } from 'rxjs';

@Component({
  selector: 'app-message-thread',
  templateUrl: './message-thread.component.html',
  styleUrls: ['./message-thread.component.css']
})
export class MessageThreadComponent implements OnInit {
  messages: Message[];
  userId = this.authService.decodedToken.nameid;
  newMessage: any = {};
  recipientId: number;
  recipient: User;
  mobile: boolean;

  constructor(private userService: UserService, private authService: AuthService,
              private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    if (window.screen.width < 360) { // 768px portrait
      this.mobile = true;
    }
    const currentUserId = +this.authService.decodedToken.nameid;
    this.route.data
      .pipe(
        tap(data => {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < data.messages.length; i++) {
            if (data.messages[i].isRead === false && data.messages[i].recipientId === currentUserId) {
              this.userService.markAsRead(currentUserId, data.messages[i].id);
            }
          }
        })
      ).subscribe(data => {
      this.messages = data.messages;
      console.log(data);
    });
    this.route.params.subscribe(r => {
      this.recipientId = r.recipientId;
    });

    this.userService.getUser(this.recipientId).subscribe(data => {
      this.recipient = data;
    });

  }

  sendMessage() {
    console.log(this.recipientId);
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe((message: Message) => {
      this.messages.unshift(message);
      console.log(message);
      this.newMessage.content = '';
    }, error => {
      this.alertify.error(error);
    });
  }
}

