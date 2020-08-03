import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AnimalService } from 'src/app/_services/animal.service';
import { Animal } from 'src/app/_models/animal';


@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {
  animals: Animal[];
  constructor(private animalService: AnimalService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadAnimals();
  }

  loadAnimals() {
    this.animalService.getAnimals().subscribe((animals: Animal[]) => {
      this.animals = animals;
    }, error => {
      this.alertify.error(error);
    });
  }

}
