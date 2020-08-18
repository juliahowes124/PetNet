import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private userService: UserService, private authService: AuthService,
              private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data.messages;
    });
    // current issue, jane is only sending messages to herself
    this.recipientId = this.messages.filter(u => u.recipientId !== this.authService.decodedToken.nameid)[0].recipientId;
  }

  sendMessage() {
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
