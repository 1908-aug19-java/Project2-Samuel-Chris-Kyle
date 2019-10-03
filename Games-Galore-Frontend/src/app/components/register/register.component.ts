import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  constructor(private accountService: AccountService, private router: Router) { }
  uName:string;
  pass:string;
  conPass:string;
  fName:string;
  lName:string;
  email:string;
  showError = false;

  rule1:string = 'At least 6 characters';
  rule2:string = 'One Uppercase letter';
  rule3:string = 'One Lowercase letter';
  rule4:string = 'One Number';

  account = {
    accountUsername: this.uName,
    accountPassword: this.pass,
    confirmPassword: this.conPass,
    accountUser: {
        userFirstName: this.fName,
        userLastName: this.lName,
        userEmail: this.email
    },
    genrePreferences: [],
    platformPreferences: []
}

  ngOnInit() {
  }

  register() {
    this.showError = false;
    this.accountService.createAccount(this.account).subscribe(
      (data: HttpResponse<any>) => {

        let authorization = data.headers.get('authorization');
        let key = 'auth';
        localStorage.setItem(key, authorization);
        this.router.navigateByUrl('/router/home');
      },
      (error: HttpErrorResponse) => {
        this.showError = true;
        console.log(error.message);
      });

  }

}
