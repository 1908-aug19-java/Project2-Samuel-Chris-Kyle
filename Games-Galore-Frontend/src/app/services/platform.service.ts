import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '../components/models/Platform';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  url : string = "http://ec2-54-80-50-16.compute-1.amazonaws.com:8081/gamesgalore/platforms"
  constructor(private http: HttpClient) { }

  loadPlatforms(): Observable<Platform[]>{
    return this.http.get<Platform[]>(this.url);
  }
}
