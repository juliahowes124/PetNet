import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Animal } from '../_models/animal';
import { TagDefinition } from '@angular/compiler';
import { Content } from '@angular/compiler/src/render3/r3_ast';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

export interface Tag {
  id: number;
  content: string;
  type: string;
}

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

    registerAnimal(userId: number, animal: Animal) {
      return this.http.post(this.baseUrl + 'animals/' + userId + '/register', animal);
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

    addTag(tag: Tag, animalId: number, userId: number) {
      return this.http.post(this.baseUrl + 'animals/' + 'tags/' + animalId, {tag, userId});
    }

    removeTag(content: string, animalId: number) {
      let params = new HttpParams();
      params = params.append('tagContent', content);
      params = params.append('animalId', animalId.toString());
      return this.http.delete(this.baseUrl + 'animals/' + animalId + '/tags/', {params});
    }
  }
