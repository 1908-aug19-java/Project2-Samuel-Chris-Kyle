import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';
import { HttpResponse } from '@angular/common/http';
import { Wishlist } from '../models/Wishlist';
import * as JWT from 'jwt-decode';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})


export class WishlistComponent implements OnInit {

  constructor(private wishService : WishlistService, private accountService: AccountService) { }
  wishlist : Wishlist[] = [];
  hold;
  ngOnInit() {
    let id : number;
    this.hold = JWT(localStorage.getItem('auth'));
    this.accountService.getAccount(this.hold.username).subscribe(
      (data) => {
        id = data[0].accountUser.userId
        this.wishService.getWishLists(id).subscribe(
          (data) => {
            this.wishlist = data;
            this.displayWishList(this.wishlist);
          },
          () => console.log("Failed")
        )
      },() => console.log("Failed")
    );

  }
  displayWishList(wish : Wishlist[]){
    console.log(wish);
  }
}
