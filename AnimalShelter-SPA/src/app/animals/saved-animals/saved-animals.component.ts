import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AnimalService } from 'src/app/_services/animal.service';
import { Animal } from 'src/app/_models/animal';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-saved-animals',
  templateUrl: './saved-animals.component.html',
  styleUrls: ['./saved-animals.component.css']
})
export class SavedAnimalsComponent implements OnInit {
  animals: Animal[];
  pagination: Pagination;
  animalParams: any = {};


  constructor(private authService: AuthService, private animalService: AnimalService,
              private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    // tslint:disable-next-line: no-unused-expression
    [
      CommonModule
    ];

    this.route.data.subscribe(data => {
      this.animals = data.animals.result;
      this.pagination = data.animals.pagination;
    });

    this.animalParams.minAge = 0;
    this.animalParams.maxAge = 100;
    this.animalParams.gender = '';
    this.animalParams.species = '';
    this.animalParams.orderBy = 'AdoptBy';
    this.animalParams.savees = 'true';
    this.animalParams.userId = this.authService.decodedToken.nameid;

    this.loadAnimals();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAnimals();
  }

  loadAnimals() {
    this.animalService.getAnimals(this.pagination.currentPage, this.pagination.itemsPerPage, this.animalParams)
    .subscribe((res: PaginatedResult<Animal[]>) => {
      this.animals = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

}
