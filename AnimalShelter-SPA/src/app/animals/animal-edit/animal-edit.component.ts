import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from 'src/app/_services/animal.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { NgForm } from '@angular/forms';
import { Animal } from 'src/app/_models/animal';
import { Tag } from 'src/app/_models/tag';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.component.html',
  styleUrls: ['./animal-edit.component.css']
})
export class AnimalEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;
  animal: Animal;
  photoUrl: string;
  likes = new Set(['walks', 'cuddles', 'food', 'toys', 'sleeping', 'outdoors']);
  qualities = new Set(['friendly', 'energetic', 'smart', 'funny', 'loving', 'independent']);
  goodWith = new Set(['children', 'dogs', 'cats', 'women', 'men', 'crowds']);
  animalLikes = {};
  animalQualities = {};
  animalGoodWith = {};
  changes = 0;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private animalService: AnimalService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.animal = data.animal;
    });
    this.bsConfig = {
      containerClass: 'theme-blue'
    };

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
  }

  updateAnimal() {
    this.animalService.updateAnimal(this.animal.id, this.animal).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.animal);
    }, error => {
      this.alertify.error(error);
    });
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
    this.changes = 1;
    }

    checkAnimalTag(content: string) {
      if (this.animal.tags.find(t => t.content === content) !== undefined) {
        return true;
      }
      return false;
    }
  }
