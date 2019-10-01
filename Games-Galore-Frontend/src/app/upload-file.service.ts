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
    


    const params = {
      Bucket: 'gamesgaloreimages',
      Key: this.FOLDER + file.name,
      Body: file,
      ContentType: 'image/png'
    };
 
    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
 
      console.log('Successfully uploaded file.', data);
      return true;
    });
  }
 
}
