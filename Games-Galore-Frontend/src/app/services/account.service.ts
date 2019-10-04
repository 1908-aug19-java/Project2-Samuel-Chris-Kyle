import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { User } from '../components/models/user';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AccountService {

  urlAccount:string = "http://ec2-54-80-50-16.compute-1.amazonaws.com:8081/gamesgalore/accounts"
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

    let a = this.http.get<any>(this.urlAccount + "?accountUsername="+ userName, httpOptions);
    console.log(a);
    return a;
  }

  createAccount(account:
    {
      accountUsername: string,
      accountPassword: string,
      confirmPassword: string,
      accountUser: {
          userFirstName: string,
          userLastName: string,
          userEmail: string
      },
      genrePreferences: any[],
      platformPreferences: any[]
  }
  ){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
      
    };

    const acc = {
      "accountUsername": account.accountUsername,
      "accountPassword": account.accountPassword,
      "confirmPassword": account.accountPassword,
      "accountUser": {
          "userFirstName": account.accountUser.userFirstName,
          "userLastName": account.accountUser.userLastName,
          "userEmail": account.accountUser.userEmail
      },
      "genrePreferences": [],
      "platformPreferences": []
    }

    return this.http.post<any>(this.urlAccount+"?", acc, httpOptions);
  }

  updateAccount(account:
    {
      accountUsername: string,
      accountImageUrl: string,
      accountUser: {
          userFirstName: string,
          userLastName: string,
          userEmail: string
      }
  }, accountId
  ){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('auth')
      })
      
    };

    const acc = {
      "accountUsername": account.accountUsername,
      "accountImageUrl": account.accountImageUrl,
      
      "accountUser": {
          "userFirstName": account.accountUser.userFirstName,
          "userLastName": account.accountUser.userLastName,
          "userEmail": account.accountUser.userEmail
      }
    }
    
    return this.http.put<any>(this.urlAccount+"/"+accountId, acc, httpOptions);
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
