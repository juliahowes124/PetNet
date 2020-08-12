import { OnInit, Input, Component } from '@angular/core';
import { Animal } from 'src/app/_models/animal';

import { AlertifyService } from 'src/app/_services/alertify.service';
import { AnimalService } from 'src/app/_services/animal.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.css']
})
export class AnimalCardComponent implements OnInit {
  @Input() animal: Animal;

  constructor(private animalService: AnimalService, private alertify: AlertifyService,
              private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
  }

  saveAnimal(animalId: number) {
    this.userService.saveAnimal(this.authService.decodedToken.nameid, animalId).subscribe(data => {
      this.alertify.success('You have liked: ' + this.animal.name);
    }, error => {
      this.alertify.error(error);
    });
  }

}
