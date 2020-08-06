import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from 'src/app/_services/animal.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { NgForm } from '@angular/forms';
import { Animal } from 'src/app/_models/animal';

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.component.html',
  styleUrls: ['./animal-edit.component.css']
})
export class AnimalEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;
  animal: Animal;
  photoUrl: string;

  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any) {
  //   if (this.editForm.dirty) {
  //     $event.returnValue = true;
  //   }
  // }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private animalService: AnimalService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.animal = data.animal;
    });
  }

  updateUser() {
    this.animalService.updateAnimal(this.authService.decodedToken.nameid, this.animal).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.animal);
    }, error => {
      this.alertify.error(error);
    });
  }

  updateMainPhoto(photoUrl) {
    this.animal.photoUrl = photoUrl;
  }
}
