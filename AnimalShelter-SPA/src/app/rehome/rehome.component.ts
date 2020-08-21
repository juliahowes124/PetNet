import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AnimalService } from '../_services/animal.service';
import { Animal } from '../_models/animal';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../_models/user';
import { Tag } from '../_models/tag';

@Component({
  selector: 'app-rehome',
  templateUrl: './rehome.component.html',
  styleUrls: ['./rehome.component.css']
})
export class RehomeComponent implements OnInit {

  animal: Animal;
  animalRegisterForm: FormGroup;
  likes = new Set(['walks', 'cuddles', 'food', 'toys', 'sleeping', 'outdoors']);
  qualities = new Set(['friendly', 'energetic', 'smart', 'funny', 'loving', 'independent']);
  goodWith = new Set(['children', 'dogs', 'cats', 'women', 'men', 'crowds']);
  tags: Tag[] = [];

  constructor(public authService: AuthService, private animalService: AnimalService,
              private alertify: AlertifyService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.animalRegisterForm = this.fb.group({
      name: [''],
      gender: [''],
      ageYears: 0,
      ageMonths: 0,
      species: [''],
      breed: [''],
      adoptionFee: 0,
      adoptBy: []

    });
  }

  loggedIn()
  {
    return this.authService.loggedIn();
  }

  registerAnimal() {
    if (this.animalRegisterForm.valid) {
      this.animal = Object.assign({}, this.animalRegisterForm.value);
      const id = this.authService.decodedToken.nameid;
      this.animal.userId = id;
      this.animal.tags = this.tags;
      this.animalService.registerAnimal(id, this.animal).subscribe(() => {
        this.alertify.success('Registration successful');
        this.router.navigate(['/your-animals']);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  addOrRemoveTag(content: string, type: string) {
    if (this.tags.find(t => t.content === content) !== undefined) {
      this.tags.splice(this.tags.findIndex(x => x.content === content), 1);
      console.log('tag was removed');
    } else {
        const newTag = new Tag(content, type);
        this.tags.push(newTag);
        console.log('tag was added');
      }
    }

}
