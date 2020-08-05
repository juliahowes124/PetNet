import {Injectable} from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AnimalService } from '../_services/animal.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Animal } from '../_models/animal';

@Injectable()
export class AnimalListResolver implements Resolve<Animal[]> {
    constructor(private animalService: AnimalService,
                private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Animal[]> {
        return this.animalService.getAnimals().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
