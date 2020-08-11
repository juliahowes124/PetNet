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
    if (type === 'like') {
      this.currentLikes.add(clickedTag);
    } else if (type === 'quality') {
      this.currentQualities.add(clickedTag);
    } else if (type === 'goodWith') {
      this.currentGoodWith.add(clickedTag);
    }
  }


  removeTag(clickedTag: string, animalId: number, type: string) {
    // debugger;
    this.animalService.removeTag(clickedTag, this.animal.id).subscribe(() => {
      if (type === 'like') {
        this.currentLikes.delete(clickedTag);
      } else if (type === 'quality') {
        this.currentQualities.delete(clickedTag);
      } else if (type === 'goodWith') {
        this.currentGoodWith.delete(clickedTag);
      }
      console.log('tag has been deleted');
    }, error => {
      console.log('failed to remove tag');
    });
  }

  addOrRemove(clickedTag: string, animalId: number, type: string) {
    if (this.currentLikes.has(clickedTag) || this.currentQualities.has(clickedTag) || this.currentGoodWith.has(clickedTag))
    {
      this.removeTag(clickedTag, animalId, type);
    }
    else
    {
      this.addTag(clickedTag, animalId, type);
    }
  }

  // addOrDelete(checkbox, clickedTag: string, animalId: number, type: string) {
  //   debugger;
  //   if (checkbox.checked)
  //   {
  //     this.addTag(clickedTag, animalId, type);
  //   }
  //   else {
  //     this.removeTag(clickedTag, animalId, type);
  //   }
  // }
}

