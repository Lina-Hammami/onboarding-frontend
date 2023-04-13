import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './../shared/auth.service';



@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://localhost:8080';
  headers!:HttpHeaders;

  constructor(private http: HttpClient,
    public authService: AuthService) { 
      // this.headers = new HttpHeaders({
      //   'Content-Type': 'image/png',
      //   'Sec-Fetch-Mode': 'cors' ,// set the content type to the appropriate image format
      //   'Authorization': 'Bearer ' +  authService.getToken()// add your authorization token here
      // });

    }


    deletePhoto(id: number, claimId: number): Observable<Object>{
      return this.http.delete(`${this.baseUrl}/claims/${claimId}/photos/delete/${id}`);
    }

  upload(file: File, claimId: number) {
    const formData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/claims/${claimId}/photos/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  
  getFiles(claimId:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/claims/${claimId}/photos/list`);
  }
  geturlauth(): any{
    const req = new HttpRequest('GET', `http://localhost:8080/claims/1/photos/files/50093761.jpg`, this.headers);
    return this.http.request(req);
  }

}
