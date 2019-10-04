import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../upload-file.service';
import { AccountService } from 'src/app/services/account.service';
import * as JWT from 'jwt-decode';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { url } from 'inspector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  selectedFiles: FileList;

  url:string = "https://gamesgaloreimages.s3.amazonaws.com/jsa-s3/trident.png";
  imageHold:string;
  keyID="";
  keySecret="";
 
  constructor(private uploadService: UploadFileService, private accountService: AccountService) { }
 
  userProfile =  {
    userId:"",
    userName:"",
    fName : "",
    lName : "",
    email : ""
  };

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  showError : boolean = false;
  jwtDecode = require('jwt-decode');
  hold;

  ngOnInit() {

    //this.accountService.getAccount()
    console.log(localStorage.getItem('auth'));
    this.hold = JWT(localStorage.getItem('auth'));
    console.log(this.hold);
    console.log(this.hold.username);

    this.accountService.getAccount(this.hold.username).subscribe(
      (data: HttpResponse<any>) => {

        console.log(data[0]);

        //console.log(data[0].accountUsername);
        this.userProfile.userId=data[0].accountUser.userId;
        this.userProfile.userName=data[0].accountUsername;
        this.userProfile.fName=data[0].accountUser.userFirstName;
        this.userProfile.lName=data[0].accountUser.userLastName;
        this.userProfile.email=data[0].accountUser.userEmail;
        this.url = data[0].accountImageUrl;

        console.log(this.userProfile);

        this.uploadService.loadKeys().subscribe(
          (data) => {
            //console.log("keys loaded");
            //console.log(data);
            
            this.keyID = data.keyStringId
            this.keySecret = data.keySecret;
            //console.log(this.keyID+this.keySecret);
          }
        );

      },
      (error: HttpErrorResponse) => {
        this.showError = true;
      });
    
  }

  updateDisplayedImage(str){
    this.url = "https://gamesgaloreimages.s3.amazonaws.com/jsa-s3/"+str;
  }
 
  upload() {
    const file = this.selectedFiles.item(0);
    this.imageHold=file.name;
    this.uploadService.uploadfile(file, this.keyID, this.keySecret);
    let self = this;
    
    console.log('Starting Timer');
    setTimeout(function (){
      console.log('timer');
      self.url = "https://gamesgaloreimages.s3.amazonaws.com/jsa-s3/"+self.imageHold;
      console.log('done');

      self.accountService.updateAccount({

        
        accountUsername: self.userProfile.userName,
        accountImageUrl: self.url,
        accountUser: {
          userFirstName: self.userProfile.fName,
          userLastName: self.userProfile.lName,
          userEmail: self.userProfile.email
      }
      }, self.userProfile.userId).subscribe(
        (data) => {
          console.log(data);
        }
      )
    }, 5000);
    console.log('Timer should be done');
    

    
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
  
}
  update(){
    this.accountService.updateUser(this.userProfile.userId, this.userProfile.fName, this.userProfile.lName,
      this.userProfile.email).subscribe(
        (data: HttpResponse<any>) => {

          console.log("Update successful.");
        },
        (error: HttpErrorResponse) => {
          this.showError = true;
        }
      );
  }
}
