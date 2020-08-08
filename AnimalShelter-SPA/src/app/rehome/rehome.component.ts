import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AnimalService } from '../_services/animal.service';
import { Animal } from '../_models/animal';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../_models/user';

@Component({
  selector: 'app-rehome',
  templateUrl: './rehome.component.html',
  styleUrls: ['./rehome.component.css']
})
export class RehomeComponent implements OnInit {

  model: any = {};
  animalRegisterForm: FormGroup;
  likes: string[] = ['walks', 'cuddles', 'food', 'toys', 'sleeping', 'outdoors'];
  qualities: string[] = ['friendly', 'energetic', 'smart', 'funny', 'loving', 'independent'];
  goodWith: string[] = ['children', 'dogs', 'cats', 'women', 'men', 'crowds'];

  constructor(public authService: AuthService, private animalService: AnimalService,
              private alertify: AlertifyService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
  }

  createRegisterForm() {
    this.animalRegisterForm = this.fb.group({
      name: [''],
      gender: [''],
    });
  }

  loggedIn()
  {
    return this.authService.loggedIn();
  }

  registerAnimal() {
    const id = this.authService.decodedToken.nameid;
    this.model.userId = id;
    this.animalService.registerAnimal(this.model).subscribe(() => {
      this.alertify.success('Registration successful');
      this.router.navigate(['/home']);
    }, error => {
      this.alertify.error(error);
    });
  }

  addToLikes(like: string) {
    this.model.likes.push(like);
  }

}
