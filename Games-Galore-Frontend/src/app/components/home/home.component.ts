import { Component, OnInit} from '@angular/core';
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

    for (let g of games) {
      if (g.cover != undefined) {
        g.cover.url = "http://" + g.cover.url.substr(2);
      } else {
        g.cover = { id: 0, url: "./assets/img/NoGameIcon.png" };
      }
    }
    let rowNum = games.length / 5;
    let index = 0;
    for (let i = 0; i < rowNum; i++) {
      let gArr: Game[] = [];
      for (let j = 0; j < 5; j++) {
        if (games[index] != undefined)
          gArr.push(games[index]);
        index++;
      }
      this.cardDisplayArray.push(gArr);
    }
    console.log(this.cardDisplayArray);
  }

} 
