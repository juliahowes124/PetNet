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

  animal: Animal;
  animalRegisterForm: FormGroup;
  likes = new Set();
  qualities = new Set();
  goodWith: string[] = [];

  constructor(public authService: AuthService, private animalService: AnimalService,
              private alertify: AlertifyService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.animalRegisterForm = this.fb.group({
      name: [''],
      gender: [''],
      age: 0,
      petType: [''],
      breed: [''],
      adoptionFee: 0,
      likes: [],
      qualties: [],
      goodWith: [],

    });
  }

  loggedIn()
  {
    return this.authService.loggedIn();
  }

  registerAnimal( animal: Animal ) {
    const id = this.authService.decodedToken.nameid;
    this.animalService.registerAnimal(id, animal).subscribe(() => {
      this.alertify.success('Registration successful');
      this.router.navigate(['/home']);
    }, error => {
      this.alertify.error(error);
    });
  }

  addToTags(checkedTag: string, type: string) {
    if (type === 'like') {
      this.likes.add(checkedTag);
    } else if (type === 'quality') {
      this.qualities.add(checkedTag);
    } else if (type === 'goodWith') {
      this.goodWith.push(checkedTag);
    }
  }

  removeFromTags(checkedTag: string, type: string) {
    if (type === 'like') {
      this.animal.likes.splice(this.animal.likes.findIndex(l => l === checkedTag));
    } else if (type === 'quality') {
      this.animal.qualities.splice(this.animal.qualities.findIndex(q => q === checkedTag));
    } else if (type === 'goodWith') {
      this.animal.goodWith.splice(this.animal.goodWith.findIndex(g => g === checkedTag));
    }
  }

  addOrRemove(checkedTag: string, type: string) {
    if (this.likes.has(checkedTag) || this.qualities.has(checkedTag)) {
      this.removeFromTags(checkedTag, type);
    } else {
      this.addToTags(checkedTag, type);
    }
  }

}
