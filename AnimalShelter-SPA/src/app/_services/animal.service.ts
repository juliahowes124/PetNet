import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Animal } from '../_models/animal';
import { TagDefinition } from '@angular/compiler';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

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

    getAnimals(page?, itemsPerPage?, animalParams?): Observable<PaginatedResult<Animal[]>> {
      const paginatedResult: PaginatedResult<Animal[]> = new PaginatedResult<Animal[]>();

      let params = new HttpParams();

      if (page != null && itemsPerPage != null) {
        params = params.append('pageNumber', page);
        params = params.append('pageSize', itemsPerPage);
      }

      if (animalParams != null) {
        params = params.append('minAge', animalParams.minAge);
        params = params.append('maxAge', animalParams.maxAge);
        params = params.append('gender', animalParams.gender);
        params = params.append('species', animalParams.species);
        params = params.append('orderBy', animalParams.orderBy);
        params = params.append('savees', animalParams.savees);
        params = params.append('userId', animalParams.userId);
      }

      return this.http.get<Animal[]>(this.baseUrl + 'animals', { observe: 'response', params})
        .pipe(
          map(response => {
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination') != null)
            {
              paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            console.log(paginatedResult);
            return paginatedResult;
          })
        );
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
