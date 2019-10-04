import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  url : string = "http://ec2-54-80-50-16.compute-1.amazonaws.com:8081/gamesgalore/games"
  constructor() { }
   
}
