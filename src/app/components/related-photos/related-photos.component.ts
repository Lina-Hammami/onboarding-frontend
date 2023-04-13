import { Component, OnInit, Input } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Photo } from '../../models/photo';

@Component({
  selector: 'app-related-photos',
  templateUrl: './related-photos.component.html',
  styleUrls: ['./related-photos.component.css']
})
export class RelatedPhotosComponent {
  @Input() claimId!: number;
  @Input() photos!: Photo[];

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  urlAuth !:any;

  fileInfos?: Observable<any>;

  constructor(private uploadService: FileUploadService) { 
    this.urlAuth = uploadService.geturlauth();
  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles(this.claimId);
    
    console.log('// files: '+this.uploadService.getFiles(this.claimId));
    console.log('//files info: '+this.fileInfos);
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  deletePhoto(id: number){
      this.uploadService.deletePhoto(id, this.claimId).subscribe( data => {
        console.log('Photo deleted successefully '+data);
        window.location.reload();
      })
    }
  
  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile, this.claimId).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles(this.claimId);
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          }
        });
      }
      // this.progress = 0;
      this.selectedFiles = undefined;
    }
  }
}
