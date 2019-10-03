import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Genre } from '../components/models/Genre';
import { Platform } from '../components/models/Platform';
import { Observable } from 'rxjs';
import { Game } from '../components/models/Game';

@Injectable({
  providedIn: 'root'
})
export class IGDBService {

  url: string = "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games"
  constructor(private http: HttpClient) { }

  getGames(search: string, genres: Genre[], platforms: Platform[]) : Observable<Game[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
        'user-key': '7a0e3a8940785bc7fbbd122f460e2fc3'        
      })
    };
    let body: string = "";
    if (search.length !== 0) {
      body += "search \"" + search + "\";";
    }
    body += "\nfields name, platforms, genres, summary, cover.url, popularity;"
    let genreIdArr: number[] = [];
    if (genres.length != 0) {
      for (let g of genres) {
        genreIdArr.push(g.genreId);
      }
    }
    let platformId: number[] = [];
    if (platforms.length != 0) {
      for (let p of platforms) {
        platformId.push(p.platformId);
      }
    }
    if (genreIdArr.length != 0 && platformId.length != 0) {
      body += "\n where genres = ";
        if(genreIdArr.length > 1){
          body += "(";
          for(let i = 0; i < genreIdArr.length; i++){
            body += genreIdArr[i];
            if(i < genreIdArr.length-1){
              body+=", "
            }
          }
          body += ")";
        }else{
          body += genreIdArr[0];
        }
        body += " & platforms = ";
        if(platformId.length > 1){
          body += "(";
          for(let j = 0; j < platformId.length; j++){
            body += platformId[j];
            if(j < platformId.length -1){
              body += ", ";
            }
          }
          body += ")"
        }else{
          body += platformId[0];
        }
        body += " & popularity > 1.5;"
    } else if (platformId.length != 0) {
      body += "\nwhere platforms = ";
      if(platformId.length > 1){
        body += "(";
        for(let i = 0; i < platformId.length; i++){
          body += platformId[i];
          if (i < platformId.length-1){
            body += ", ";
          }
        }
        body += ")";
      }else{
        body += platformId[0];
      }
      body += " & popularity > 1.5;";
    }else if(genreIdArr.length != 0){
      body += "\nwhere genres = ";
      if(genreIdArr.length > 1){
        body += "(";
        for(let i = 0; i < genreIdArr.length; i++){
          body += genreIdArr[i];
          if (i < genreIdArr.length-1){
            body += ", ";
          }
        }
        body += ")";
      }else{
        body += genreIdArr[0];
      }
      body += " & popularity > 1.5;";
    }
     body += "\nlimit 50;";
    console.log(body);


    return this.http.post<Game[]>(this.url, body, httpOptions).pipe();
  }
}
