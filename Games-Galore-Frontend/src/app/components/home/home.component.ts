import { Component, OnInit } from '@angular/core';
import { GenreService } from 'src/app/services/genre.service';
import { Genre } from '../models/Genre';
import { PlatformService } from 'src/app/services/platform.service';
import { Platform } from '../models/Platform';
import { IGDBService } from 'src/app/services/igdb.service';
import { Game } from '../models/Game';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  platforms: Platform[];
  genres: Genre[];
  ses = localStorage.getItem('auth');
  games: Game[] = [];
  cardDisplayArray: Game[][] = [];
  constructor(private genreService: GenreService, private platformService: PlatformService, private igdbService: IGDBService) { }

  ngOnInit() {
    this.platformService.loadPlatforms().subscribe(
      (data) => {
        this.platforms = data;
      }
    )
    this.genreService.loadGenres().subscribe(
      (data) => {
        this.genres = data;
      }
    )

  }
  getGames() {
    this.cardDisplayArray = [];
    let genChecked: Genre[] = [];
    let platChecked: Platform[] = [];

    for (let plat of this.platforms) {
      let name = plat.platformName;
      let platCheck = <HTMLInputElement>document.getElementById(name);
      if (platCheck.checked) {
        platChecked.push(plat);
      }
    }

    for (let gen of this.genres) {
      let name = gen.genreName;
      let genreCheck = <HTMLInputElement>document.getElementById(name);
      if (genreCheck.checked) {
        genChecked.push(gen);
      }

    }
    let search = <HTMLInputElement>document.getElementById("searchInput");
    let searchValue = search.value;

    this.igdbService.getGames(searchValue, genChecked, platChecked).subscribe(
      (data) => {

        this.games = data
        this.displayGames(this.games);

      },

      () => console.log("failed")
    );

  }

  displayGames(games: Game[]) {
    games = games.sort((a,b) => b.popularity - a.popularity);
    for (let g of games) {
      g.platformName = [];
      if (g.platforms != undefined) {
        for (let nu of g.platforms) {
          switch (nu) {
            case 9:
              g.platformName.push("PS3");
              break;
            case 5:
              g.platformName.push("Wii");
              break;
            case 12:
              g.platformName.push("Xbox360");
              break;
            case 41:
              g.platformName.push("WiiU");
              break;
            case 48:
              g.platformName.push("PS4");
              break;
            case 49:
              g.platformName.push("XboxOne");
              break;
            case 130:
              g.platformName.push("Switch");
              break;
          }
        }
        if(g.platformName.length == 0){
          g.platformPresent = false;
        }else{
          g.platformPresent = true;
        }
      }else{
        g.platformPresent = false;
      }
      g.genreName = [];
      if (g.genres != undefined) {
       
        for (let nu of g.genres) {
          switch (nu) {
            case 4:
              g.genreName.push("Fighting");
              break;
            case 5:
              g.genreName.push("Shooter");
              break;
            case 8:
              g.genreName.push("Platform");
              break;
            case 9:
              g.genreName.push("Puzzle");
              break;
            case 10:
              g.genreName.push("Racing");
              break;
            case 12:
              g.genreName.push("RPG");
              break;
            case 15:
              g.genreName.push("Strategy");
              break;
            case 31:
              g.genreName.push("Adventure");
              break;
          }

        }
        if(g.genreName.length == 0){
          g.genrePresent = false;
        }else{
          g.genrePresent = true;
        }
      }else{
        g.genrePresent = false;
      }
      if (g.cover != undefined) {
        g.cover.url = "http://" + g.cover.url.substr(2);
      } else {
        g.cover = { id: 0, url: "./assets/img/NoGameIcon.png" };
      }
    }
    let rowNum = games.length / 4;
    let index = 0;
    for (let i = 0; i < rowNum; i++) {
      let gArr: Game[] = [];
      for (let j = 0; j < 4; j++) {
        if (games[index] != undefined)
          gArr.push(games[index]);
        index++;
      }
      this.cardDisplayArray.push(gArr);
    }
  }

} 

