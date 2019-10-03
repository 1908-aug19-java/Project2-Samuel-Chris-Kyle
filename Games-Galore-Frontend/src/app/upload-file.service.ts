import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
 
@Injectable()
export class UploadFileService {
 
  FOLDER = 'jsa-s3/';
 
  constructor() { }
 
  uploadfile(file) {
 
    const bucket = new S3(
      {
        accessKeyId: 'AKIAWTG6BCP43US6ISXN',
        secretAccessKey: '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',
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
      bucket.upload(params, function (err, data) {
        if (err) {
          console.log('There was an error uploading your file: ', err);
          return false;
        }
  
        console.log('Successfully uploaded file.', data);
        return true;
      });
    }
    else{
      console.log('That is not an acceptable image file type.');
    }
  }
 
}
