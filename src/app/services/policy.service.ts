import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from './../shared/auth.service';
import { Policy } from '../models/policy';


@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private baseURL = "http://localhost:8080/policies";

  constructor(private httpClient: HttpClient) { }
  
  getPolicysList(): Observable<Policy[]>{
    return this.httpClient.get<Policy[]>(`${this.baseURL}/list`)
  }
  
  getAllNumbers(): Observable<String[]>{
    return this.httpClient.get<String[]>(`${this.baseURL}/nbs`)
  }

  createPolicy(policy: Policy): Observable<Object>{
    
    return this.httpClient.post(`${this.baseURL}/add`, policy);
  }

  getPolicyById(id: number): Observable<Policy>{
    return this.httpClient.get<Policy>(`${this.baseURL}/${id}`);
  }

  getPolicyByNb(nb: string): Observable<Policy>{
    return this.httpClient.get<Policy>(`${this.baseURL}/nb/${nb}`);
  }

  updatePolicy(id: number, policy: Policy): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/update/${id}`, policy);
  }

  deletePolicy(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }
}
