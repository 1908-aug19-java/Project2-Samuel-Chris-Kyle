import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';
import { HttpResponse } from '@angular/common/http';
import { Wishlist } from '../models/Wishlist';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private wishService : WishlistService) { }
  wishlist : Wishlist[] = [];
  ngOnInit() {
   this.getWish();
  }
  getWish(){
    this.wishService.getWishLists().subscribe(
      (data : Wishlist[]) => {
        this.wishlist = data;
        console.log(this.wishlist);
      },
      () => console.log("Failed")
    )
    
  }
}
