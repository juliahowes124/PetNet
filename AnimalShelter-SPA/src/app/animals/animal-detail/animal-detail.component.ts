import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AnimalService } from 'src/app/_services/animal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/_models/animal';
import { Tag } from 'src/app/_models/tag';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {
  animal: Animal;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  timeLeft: number;
  userId: number;
  animalLikes: Tag[];
  animalQualities: Tag[];
  animalGoodWith: Tag[];


  constructor(private animalService: AnimalService, private alertify: AlertifyService, private route: ActivatedRoute,
              private userService: UserService, private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.animal = data.animal;
    });

    if (this.authService.decodedToken !== undefined) {
      this.userId = this.authService.decodedToken.nameid;
    }

    this.animalLikes = this.animal.tags.filter(t => t.type === 'like');
    this.animalQualities = this.animal.tags.filter(t => t.type === 'quality');
    this.animalGoodWith = this.animal.tags.filter(t => t.type === 'goodWith');

    const adoptby = this.animal.adoptBy.valueOf();
    this.timeLeft = Math.round((new Date(adoptby).getTime() - Date.now()) / (60 * 60 * 24 * 1000));
    if (this.timeLeft < 0) {
      this.timeLeft = 0;
    }

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.galleryImages = this.getImages();

  }

  getImages() {
    const imageUrls = [];
    imageUrls.push( {
      small: this.animal.photos.filter(p => p.isMain)[0].url,
      medium: this.animal.photos.filter(p => p.isMain)[0].url,
      big: this.animal.photos.filter(p => p.isMain)[0].url,
      description: this.animal.photos.filter(p => p.isMain)[0].description
    });
    for (const photo of this.animal.photos.filter(p => !p.isMain)) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }
    return imageUrls;
  }

  saveAnimal(animalId: number) {
    if (this.authService.decodedToken === undefined) {
      this.alertify.warning('To save this pet, all you need to do is sign up!');
      this.router.navigate(['/register']);
    } else {
      this.userService.saveAnimal(this.authService.decodedToken.nameid, animalId).subscribe(data => {
        this.alertify.success('You have liked ' + this.animal.name);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

}
