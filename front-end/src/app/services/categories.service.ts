import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'observe': 'response'
  })
}

@Injectable()
export class CategoriesService{

  public url:string;
  constructor(private http: HttpClient) {
      this.url = GLOBAL.url;
  }

  getAll(): Observable<any>{
        return this.http.get<Category[]>(this.url+'categories', httpOptions);
  }

}
