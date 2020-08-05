import { OnInit, Input, Component } from '@angular/core';
import { Animal } from 'src/app/_models/animal';

import { AlertifyService } from 'src/app/_services/alertify.service';
import { AnimalService } from 'src/app/_services/animal.service';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.css']
})
export class AnimalCardComponent implements OnInit {
  @Input() animal: Animal;

  constructor(private animalService: AnimalService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

}
