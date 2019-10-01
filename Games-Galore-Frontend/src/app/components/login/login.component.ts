import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginServiceService, private router: Router) { }
  uName: string;
  pass: string;

  showError : boolean = false;
  ngOnInit() {
  }

  login() {
    this.showError = false;
    this.loginService.loginUser(this.uName, this.pass).subscribe(
      (data: HttpResponse<any>) => {

        let authorization = data.headers.get('authorization');
        let key = 'auth';
        localStorage.setItem(key, authorization);
        this.router.navigateByUrl('/router/home');
      },
      (error: HttpErrorResponse) => {
        this.showError = true;
      });

  }
}
