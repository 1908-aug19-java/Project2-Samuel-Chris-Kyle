import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wishlist } from '../components/models/Wishlist';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  url:string = "http://ec2-54-80-50-16.compute-1.amazonaws.com:8081/gamesgalore/wishlists";

  constructor(private http : HttpClient) { }

  getWishLists(){
    return this.http.get<Wishlist[]>(this.url);
  }
}
