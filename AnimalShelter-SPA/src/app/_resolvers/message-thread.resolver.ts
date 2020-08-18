import {Injectable} from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Injectable()
export class MessageThreadResolver implements Resolve<Message[]> {

    constructor(private userService: UserService, private authService: AuthService,
                private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userService.getMessageThread(route.params.id,
            route.params.recipientId).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving message thread');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
