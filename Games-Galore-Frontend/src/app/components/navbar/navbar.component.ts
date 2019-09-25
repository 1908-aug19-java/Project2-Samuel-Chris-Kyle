import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  homeTab = false;
  wishlistTab = false;
  profileTab = false;
  constructor() { }

  listClick(event) {
    this.homeTab = false;
    this.wishlistTab = false;
    this.profileTab = false;
    switch (event) {
      case "home":
        this.homeTab = true;
        break;
      case "profile":
        this.profileTab = true;
        break;
      case "wishlist":
        this.wishlistTab = true;
        break;
    }
  }
  ngOnInit() {
  }

}
