import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import * as ENV from '../environments/environment'
import { Observable, of as observableOf } from 'rxjs';
import { resolve } from 'dns';
 
@Injectable()
export class UploadFileService {
 
  FOLDER = 'jsa-s3/';
 
  constructor() { }
 
  uploadfile(file) {
 
    const bucket = new S3(
      {
        accessKeyId: ENV.environment.S3_KEY_ID,
        secretAccessKey: ENV.environment.S3_KEY_SECRET,
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
  }
 
}
