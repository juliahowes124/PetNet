import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/_models/animal';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AnimalService } from 'src/app/_services/animal.service';

@Component({
  selector: 'app-animal-register',
  templateUrl: './animal-register.component.html',
  styleUrls: ['./animal-register.component.css']
})
export class AnimalRegisterComponent implements OnInit {

  animal: Animal;

  constructor(private animalService: AnimalService, private alertify: AlertifyService, private router: ActivatedRoute) { }

  ngOnInit() {
  }

  animalRegister() {
    this.animalService.register(this.animal).subscribe(() => {
      this.alertify.success('Your pet was successfully registered');
    }, error => {
      this.alertify.error(error);
    });
  }

}
