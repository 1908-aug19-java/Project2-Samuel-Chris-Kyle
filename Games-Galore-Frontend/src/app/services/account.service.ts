import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { User } from '../components/models/user';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  urlAccount:string = "http://ec2-54-80-50-16.compute-1.amazonaws.com:8081/gamesgalore/accounts?"
  urlUser:string = "http://ec2-54-80-50-16.compute-1.amazonaws.com:8081/gamesgalore/users/"
  
  constructor(private http: HttpClient) { }

  getAccount(userName: string): Observable<Object>{
    console.log("Username: " + userName);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Bearer '+ localStorage.getItem('auth')
      })
      
    };
    return this.http.get<any>(this.urlAccount + "accountUsername="+ userName, httpOptions);
  }

  updateUser(userId: any, fName: string, lName: string, email: string): Observable<Object>{
    const body = {
      "userFirstName": fName,
      "userLastName": lName,
      "userEmail": email
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('auth')
      })
      
    };
    return this.http.put<any>(this.urlUser + userId, body, httpOptions);
  }
}
