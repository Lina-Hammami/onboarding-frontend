import { Component, OnInit, Input } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClaimService } from 'src/app/services/claim.service';
import { Claim } from '../../models/claim'
import { Router } from '@angular/router';
import { PolicyService } from 'src/app/services/policy.service';
import { Policy } from 'src/app/models/policy';


@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.css']
})
export class AddPolicyComponent {
  policy:Policy = new Policy();

  constructor(private policyService: PolicyService,
    private router: Router) { 
    
  }
  

  onSubmit(){
    console.log('sending : '+this.policy);
    this.savePolicy();
  }
  savePolicy(){
    this.policyService.createPolicy(this.policy).subscribe( data =>{
      console.log('policy added successefully : '+data);
    },
    error => console.log(error));
  }

}
