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

    register(animal: Animal) {
      return this.http.post(this.baseUrl + 'animals/' + 'register', animal);
    }
  }
