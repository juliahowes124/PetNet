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
  likes: string[] = ['walks', 'cuddles', 'food', 'toys', 'sleeping', 'outdoors'];
  qualities: string[] = ['friendly', 'energetic', 'smart', 'funny', 'loving', 'independent'];
  goodWith: string[] = ['children', 'dogs', 'cats', 'women', 'men', 'crowds'];

  constructor(private animalService: AnimalService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.animal = data.animal;
    });
  }

  addTag(clickedTag: string, animalId: number) {
    console.log('poop');
    const tag: Tag = new Tag(clickedTag, 'like');
    this.animalService.addTag(tag, this.animal.id).subscribe();
  }

  // removeTag(clickedTag: string, animalId: number) {
  //   console.log('removing tag');
  //   const tag: Tag = new Tag(clickedTag, 'like');
  //   this.animalService.removeTag(tag, this.animal.id).subscribe();
  // }

}
