import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { User } from '../components/models/user';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url:string = "http://ec2-54-80-50-16.compute-1.amazonaws.com:8081/gamesgalore/login?"
  constructor(private http: HttpClient) { }

  getAccount(userName: string): Observable<Object>{
    console.log("Username: " + userName);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Bearer '+ sessionStorage.getItem('auth')
      })
      
    };
    return this.http.post<any>(this.url + "accountUsername="+ userName, httpOptions,{observe: 'response' as 'body'});
  }
}
