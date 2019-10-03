import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from '../components/models/Genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  url : string = "http://ec2-54-80-50-16.compute-1.amazonaws.com:8081/gamesgalore/genres"
  constructor(private http: HttpClient) { }

  loadGenres(): Observable<Genre[]>{
    return this.http.get<Genre[]>(this.url);
  }
}
