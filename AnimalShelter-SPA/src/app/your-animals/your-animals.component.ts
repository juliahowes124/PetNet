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

  constructor(private route: ActivatedRoute, public authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.animals = data.animals.filter(animal => animal.userId == this.authService.decodedToken.nameid);
    });
  }

}
