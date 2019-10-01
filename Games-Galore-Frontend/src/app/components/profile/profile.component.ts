import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../upload-file.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  selectedFiles: FileList;

  url: "https://gamesgaloreimages.s3.amazonaws.com/jsa-s3/justice.png";
 
  constructor(private uploadService: UploadFileService) { }
 
  ngOnInit() {
  }
 
  upload() {
    const file = this.selectedFiles.item(0);
    this.uploadService.uploadfile(file);
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
  
}
}
