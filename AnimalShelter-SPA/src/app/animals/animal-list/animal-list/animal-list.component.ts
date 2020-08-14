import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AnimalService } from 'src/app/_services/animal.service';
import { Animal } from 'src/app/_models/animal';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';


@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {
  animals: Animal[];
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  animalParams: any = {};
  pagination: Pagination;

  constructor(private animalService: AnimalService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.animals = data.animals.result;
      this.pagination = data.animals.pagination;
    });

    this.animalParams.minAge = 0;
    this.animalParams.maxAge = 100;
    this.animalParams.orderBy = 'AdoptBy';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAnimals();
  }

  resetFilters() {
    this.animalParams.gender = '';
    this.animalParams.species = '';
    this.animalParams.minAge = 0;
    this.animalParams.maxAge = 100;
    this.loadAnimals();
  }

  loadAnimals() {
    this.animalService.getAnimals(this.pagination.currentPage, this.pagination.itemsPerPage, this.animalParams)
    .subscribe((res: PaginatedResult<Animal[]>) => {
      this.animals = res.result;
      this.pagination = res.pagination;
      console.log(this.animals);
      console.log(this.pagination);
    }, error => {
      this.alertify.error(error);
    });
  }

}
