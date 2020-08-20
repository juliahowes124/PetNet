import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animal } from '../_models/animal';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { AnimalService } from '../_services/animal.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-your-animals',
  templateUrl: './your-animals.component.html',
  styleUrls: ['./your-animals.component.css']
})
export class YourAnimalsComponent implements OnInit {
  animals: Animal[];
  timeLefts: {[animalId: number]: number} = {};

  constructor(private route: ActivatedRoute, public authService: AuthService,
              private animalService: AnimalService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.animals = data.animals.result.filter(animal => animal.userId == this.authService.decodedToken.nameid);
    });

    for (const animal of this.animals) {
      const adoptby = animal.adoptBy.valueOf();
      this.timeLefts[animal.id] = Math.round((new Date(adoptby).getTime() - Date.now()) / (60 * 60 * 24 * 1000));
      if (this.timeLefts[animal.id] < 0) {
        this.timeLefts[animal.id] = 0;
      }
    }
  }

  markAsAdopted(animalId: number) {
    this.animalService.markAsAdopted(this.authService.decodedToken.nameid, animalId).subscribe(data => {
      this.alertify.success('Congratulations!');
    }, error => {
      this.alertify.error(error);
    });
  }

}
