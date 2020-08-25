import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from 'src/app/_services/animal.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Animal } from 'src/app/_models/animal';
import { Tag } from 'src/app/_models/tag';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.component.html',
  styleUrls: ['./animal-edit.component.css'],
  providers: [DatePipe]
})
export class AnimalEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;
  animal: Animal;
  originalAnimal: Animal;
  photoUrl: string;
  likes = new Set(['walks', 'cuddles', 'food', 'toys', 'sleeping', 'outdoors']);
  qualities = new Set(['friendly', 'energetic', 'smart', 'funny', 'loving', 'independent']);
  goodWith = new Set(['children', 'dogs', 'cats', 'women', 'men', 'crowds']);
  animalLikes = {};
  animalQualities = {};
  animalGoodWith = {};
  bsConfig: Partial<BsDatepickerConfig>;
  animalUpdateForm: FormGroup;
  tagChanges = 0;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private datepipe: DatePipe,
              private animalService: AnimalService, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.animal = data.animal;
      this.originalAnimal = data.animal;
    });
    this.bsConfig = {
      containerClass: 'theme-blue'
    };

    let date = this.datepipe.transform(this.animal.adoptBy, 'MM/dd/yyyy');

    this.animalLikes = {'walks': this.checkAnimalTag('walks'),
    'cuddles': this.checkAnimalTag('cuddles'),'food': this.checkAnimalTag('food'),
    'toys': this.checkAnimalTag('toys'),'sleeping': this.checkAnimalTag('sleeping'),
    'outdoors': this.checkAnimalTag('outdoors')};

    this.animalQualities = {'friendly': this.checkAnimalTag('friendly'),
    'energetic': this.checkAnimalTag('energetic'), 'smart': this.checkAnimalTag('smart'),
    'funny': this.checkAnimalTag('funny'), 'loving': this.checkAnimalTag('loving'),
    'independent': this.checkAnimalTag('independent')};

    this.animalGoodWith = {'children': this.checkAnimalTag('children'), 'dogs': this.checkAnimalTag('dogs'),
    'cats': this.checkAnimalTag('cats'), 'women': this.checkAnimalTag('women'),
    'men': this.checkAnimalTag('men'), 'crowds': this.checkAnimalTag('crowds')};

    this.createUpdateForm();
  }

  createUpdateForm() {
    this.animalUpdateForm = this.fb.group({
      name: [this.animal.name, Validators.required],
      description: [this.animal.description],
      gender: [this.animal.gender],
      ageYears: [this.animal.ageYears],
      ageMonths: [this.animal.ageMonths],
      species: [this.animal.species],
      breed: [this.animal.breed],
      adoptionFee: [this.animal.adoptionFee],
      adoptBy: [this.datepipe.transform(this.animal.adoptBy, 'MM/dd/yyyy')],
      tags: [this.animal.tags]

    });
  }

  updateAnimal() {
    console.log(this.animal.adoptBy);
    if (this.animalUpdateForm.valid) {
      this.animal = Object.assign({}, this.animalUpdateForm.value);
      this.animal.id = this.originalAnimal.id;
      this.animal.userId = this.originalAnimal.userId;
      this.animalService.updateAnimal(this.animal.id, this.animal).subscribe(next => {
        this.alertify.success('Profile updated successfully');
        this.animalUpdateForm.reset(this.animal);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  updateMainPhoto(photoUrl) {
    this.animal.photoUrl = photoUrl;
  }

  addOrRemoveTag(content: string, type: string) {
    if (this.animal.tags.find(t => t.content === content) !== undefined) {
      this.animal.tags.splice(this.animal.tags.findIndex(x => x.content === content), 1);
      console.log('tag was removed');
    } else {
        const newTag = new Tag(content, type);
        this.animal.tags.push(newTag);
        console.log('tag was added');
      }
    this.tagChanges = 1;
    }

  checkAnimalTag(content: string) {
    if (this.animal.tags.find(t => t.content === content) !== undefined) {
      return true;
    }
    return false;
  }

  isDifferent() {

    const isSame = (this.animalUpdateForm.value.name === this.originalAnimal.name
              && this.animalUpdateForm.value.gender === this.originalAnimal.gender
              && this.animalUpdateForm.value.ageYears == this.originalAnimal.ageYears
              && this.animalUpdateForm.value.ageMonths == this.originalAnimal.ageMonths
              && this.animalUpdateForm.value.description === this.originalAnimal.description
              && this.animalUpdateForm.value.species === this.originalAnimal.species
              && this.animalUpdateForm.value.breed === this.originalAnimal.breed
              && this.datepipe.transform(this.animalUpdateForm.value.adoptBy, 'MM/dd/yyyy')
                === this.datepipe.transform(this.originalAnimal.adoptBy, 'MM/dd/yyyy')
              && this.animalUpdateForm.value.adoptionFee == this.originalAnimal.adoptionFee
              && !this.tagChanges);
    return !isSame;
  }

  reset() {
    this.animalUpdateForm.reset(this.animal);
    // this.animalUpdateForm.setValue(value: {adoptBy: this.datepipe.transform(this.originalAnimal.adoptBy, 'MM/dd/yyyy')};
    this.animal.tags = this.originalAnimal.tags;
  }
  }
