import { Component, OnInit, Input } from '@angular/core';
import { AnimalService } from '../_services/animal.service';
import { Tag } from '../_models/tag';
import { Animal } from '../_models/animal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.css']
})
export class TagEditorComponent implements OnInit {
  @Input() animal: Animal;
  likesChecks = {};
  qualitiesChecks = {};
  goodWithChecks = {};
  tags: Tag[];

  likes = ['walks', 'cuddles', 'food', 'toys', 'sleeping', 'outdoors'];
  qualities = ['friendly', 'energetic', 'smart', 'funny', 'loving', 'independent'];
  goodWith = ['children', 'dogs', 'cats', 'women', 'men', 'crowds'];

  currentLikes = new Set();
  currentQualities = new Set();
  currentGoodWith = new Set();

  constructor(private animalService: AnimalService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.animal = data.animal;
    });
    this.currentLikes = new Set(this.animal.likes);
    this.currentQualities = new Set(this.animal.qualities);
    this.currentGoodWith = new Set(this.animal.goodWith);

    for (const like of this.likes) {
      this.likesChecks[like] = this.currentLikes.has(like);
    }
    for (const quality of this.qualities) {
      this.qualitiesChecks[quality] = this.currentQualities.has(quality);
    }
    for (const goodWith of this.goodWith) {
      this.goodWithChecks[goodWith] = this.currentGoodWith.has(goodWith);
    }
  }

  addTag(clickedTag: string, animalId: number, type: string) {
    console.log(type);
    const tag: Tag = new Tag(clickedTag, type);
    this.animalService.addTag(tag, this.animal.id).subscribe();
  }


  // removeTag(clickedTag: string, animalId: number, type: string) {
  //   console.log('removing tag');
  //   const tag: Tag = new Tag(clickedTag, 'like');
  //   this.animalService.removeTag(tag, this.animal.id).subscribe();
  // }

  // deletePhoto(id: number) {
  //   this.alertify.confirm('Are you sure you want to delete this photo?', () => {
  //     this.animalService.deletePhoto(this.animal.id, id).subscribe(() => {
  //       this.animal.photos.splice(this.animal.photos.findIndex(p => p.id === id), 1);
  //       this.alertify.success('Photo has been deleted');
  //     }, error => {
  //       this.alertify.error('Failed to delete the photo');
  //     });
  //   });
  // }
}

