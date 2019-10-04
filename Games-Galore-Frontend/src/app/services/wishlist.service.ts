import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Wishlist } from '../components/models/Wishlist';
import { AccountService } from './account.service';




@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  url: string = "http://ec2-54-80-50-16.compute-1.amazonaws.com:8081/gamesgalore/wishlists";

  constructor(private http: HttpClient, private accountService: AccountService) { }


  
  getWishLists(id : number) {
    return this.http.get<Wishlist[]>(this.url + "/" + 2);
  }
  
  postWishList(username: string, wishlistName : string){
    
  }
}
