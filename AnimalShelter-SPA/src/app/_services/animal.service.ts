import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Animal } from '../_models/animal';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAnimals(): Observable<Animal[]> {
      return this.http.get<Animal[]>(this.baseUrl + 'animals', httpOptions);
    }

    getAnimal(id): Observable<Animal> {
      return this.http.get<Animal>(this.baseUrl + 'animals/' + id);
    }

    registerAnimal(animal: Animal) {
      return this.http.post(this.baseUrl + 'animals/' + 'register', animal);
    }

    updateAnimal(id: number, animal: Animal) {
      return this.http.put(this.baseUrl + 'animals/' + animal.id, animal);
    }

    setMainPhoto(animalId: number, id: number) {
    return this.http.post(this.baseUrl + 'animals/' + animalId + '/photos/' + id + '/setMain', {}, httpOptions);
    }

    deletePhoto(animalId: number, id: number) {
      return this.http.delete(this.baseUrl + 'animals/' + animalId + '/photos/' + id, httpOptions);
    }

    changeMainPhoto(photoUrl: string, animal: Animal) {
      animal.photoUrl = photoUrl;
    }
  }
