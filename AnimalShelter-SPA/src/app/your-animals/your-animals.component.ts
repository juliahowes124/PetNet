import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animal } from '../_models/animal';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-your-animals',
  templateUrl: './your-animals.component.html',
  styleUrls: ['./your-animals.component.css']
})
export class YourAnimalsComponent implements OnInit {
  animals: Animal[];
  timeLefts: {[animalId: number]: number} = {};

  constructor(private route: ActivatedRoute, public authService: AuthService) { }

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

}
