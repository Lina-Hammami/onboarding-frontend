import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './../shared/auth.service';
import { Claim } from '../models/claim';


@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private baseURL = "http://localhost:8080/claims";

  constructor(private httpClient: HttpClient) { }
  
  getClaimsList(): Observable<Claim[]>{
    return this.httpClient.get<Claim[]>(`${this.baseURL}/list`);
  }

  createClaim(claim: Claim): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/add`, claim);
  }

  getClaimById(id: number): Observable<Claim>{
    return this.httpClient.get<Claim>(`${this.baseURL}/${id}`);
  }

  updateClaim(id: number, claim: Claim): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/update/${id}`, claim);
  }

  deleteClaim(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }
}
