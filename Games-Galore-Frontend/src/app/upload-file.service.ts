import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import * as ENV from '../environments/environment'
import { Observable, of as observableOf } from 'rxjs';
import { resolve } from 'dns';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
let selfThis = this;


@Injectable()
export class UploadFileService {
 
  FOLDER = 'jsa-s3/';

  

  
  url:string = "http://ec2-54-80-50-16.compute-1.amazonaws.com:8081/gamesgalore/keys/1"
  constructor(private http: HttpClient) { }

  loadKeys(){
    console.log(localStorage.getItem('auth'));
    const httpOtions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Bearer '+ localStorage.getItem('auth')

      })
      
    };
    return this.http.get<any>(this.url, httpOtions);
  }
  

 
  uploadfile(file, keyID, keySecret) {
 
    const bucket = new S3(
      {
        accessKeyId: keyID,
        secretAccessKey: keySecret,
        region: 'us-east-1'
      }
    );
    
    let extn = file.name.split('.').pop();
    let isImage = false;
    let contentType = 'application/octet-stream';
    if (extn == 'png' || extn == 'jpg' || extn == 'gif') {
      contentType = "image/" + extn;
      isImage = true;
    }
    const params = {
      Bucket: 'gamesgaloreimages',
      Key: this.FOLDER + file.name,
      Body: file,
      ContentType: contentType
    };
    if(isImage){
      if(bucket.upload(params, function (err, data) {
        if (err) {
          console.log('There was an error uploading your file: ', err);
          return false;
        }
  
        console.log('Successfully uploaded file.', data);
        return true;
      })){
        console.log('trying to resolve promise');
        return true;
        
      }
      else{

        console.log('trying to cancel promise');
        return false;
        
      }
        
        
      
    }else{
      console.log('That is not an acceptable image file type.');
      return observableOf(false);
      
    }
  };
 
}
