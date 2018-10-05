import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Character } from '../models/character';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'observe': 'response'
  })
}

@Injectable()
export class CharactersService{

  public url:string;
  constructor(private http: HttpClient) {
      this.url = GLOBAL.url;
  }

  getAll(): Observable<any>{
    return this.http.get<Character[]>(this.url+'characters', httpOptions);
  }

  getByID(id: number): Observable<any>{
    return this.http.get(this.url+'characters/'+id, { observe: 'response'});  
  }

  delChar(id: number): Observable<any>{
    return this.http.delete(this.url+'characters/'+ id, httpOptions);  
  }

  addCharacter(character: Character): Observable<any>{
		return this.http.post(this.url+'characters', character, httpOptions );
	}
  
  editCharacter(id: number, character: Character): Observable<any> {
    return this.http.patch(this.url+'characters/' + id, character, httpOptions);
  }

  searchCharacter(data: any): Observable<any>{
    return this.http.get(this.url+'characters/search_character?q='+data, httpOptions);
  }

  getTotalPages(): Observable<any>{
    return this.http.get(this.url+'characters/total_pages', httpOptions);
  }

  getPageCharacter(page: number): Observable<any>{
    return this.http.get(this.url+'characters?page='+page, httpOptions);
  }
}
