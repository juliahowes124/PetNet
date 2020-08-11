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
  likesChecks: any;
  qualitiesChecks: any;
  goodWithChecks: any;
  tags: Tag[];

  likes = new Set(['walks', 'cuddles', 'food', 'toys', 'sleeping', 'outdoors']);
  qualities = new Set(['friendly', 'energetic', 'smart', 'funny', 'loving', 'independent']);
  goodWith = new Set(['children', 'dogs', 'cats', 'women', 'men', 'crowds']);

  currentLikes = new Set();
  currentQualities = new Set();

  constructor(private animalService: AnimalService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.animal = data.animal; // this returned animal has its tags included
    });
    this.currentLikes = new Set(this.animal.likes);
    this.currentQualities = new Set(this.animal.qualities);

    this.likesChecks = {'walks': this.currentLikes.has('walks'),
      'cuddles': this.currentLikes.has('cuddles'),'food': this.currentLikes.has('food'),
      'toys': this.currentLikes.has('toys'),'sleeping': this.currentLikes.has('sleeping'),
      'outdoors': this.currentLikes.has('outdoors')};

    // this.qualitiesChecks = {'friendly': this.currentQualities.has('friendly'),
    //   'energetic': this.currentQualities.has('energeitc'), 'smart': this.currentQualities.has('smart'),
    //   'funny': this.currentQualities.has('funny'), 'loving': this.currentQualities.has('loving'),
    //   'independent': this.currentQualities.has('independent')};

    // this.goodWithChecks = {'children': this.goodWithChecks.has('children'), 'dogs': this.goodWithChecks.has('dogs'),
    //  'cats': this.goodWithChecks.has('cats'), 'women': this.goodWithChecks.has('women'),
    //  'men': this.goodWithChecks.has('men'), 'crowds': this.goodWithChecks.has('crowds')};
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

