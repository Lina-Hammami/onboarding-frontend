import { Component, OnInit, Input } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClaimService } from 'src/app/services/claim.service';
import { Claim } from '../../models/claim';
import { Router } from '@angular/router';
import { PolicyService } from 'src/app/services/policy.service';
import { Policy } from 'src/app/models/policy';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-add-claim',
  templateUrl: './add-claim.component.html',
  styleUrls: ['./add-claim.component.css']
})
export class AddClaimComponent {
  claim: Claim = new Claim();
  pNum!: string;
  pnumbers:String[]=[];
  errorMessage: string="";
  successMessage: string="";
  showErrorAlert: boolean = false;
  showSuccessAlert: boolean = false;

  constructor(private claimService: ClaimService,
    private policyService: PolicyService,
    private router: Router) { 
    
  }

  ngOnInit(){
    this.policyService.getAllNumbers().subscribe(numbers => {
      this.pnumbers = numbers;
      console.log(this.pnumbers);
    });
  }

  saveClaim(){
    this.claim.status=0;

    this.policyService.getPolicyByNb(this.pNum).subscribe(param => {
        let p = new Policy();
        p.policyId = param['policyId'];
        p.policyNb = param['policyNb'];
        this.claim.creationDate = new Date();
        this.claim.policy = p;  
        

        if (this.claim.policy!=null){
          console.log('Policy Policy exists'+this.claim.policy);
          this.claimService.createClaim(this.claim).subscribe( data =>{
            console.log('claim added: '+data);
            this.successMessage = 'Claim deleted successefully ';
            this.showSuccessAlert = true;
            this.goToClaimList();
          },(error) => {
            console.log('Error Adding claim: '+error);
            this.errorMessage = 'Error Adding claim: '+ error;
            this.showErrorAlert = true;
          });
        }
      },(error) => {
        console.log('Error Adding claim: '+error);
        this.errorMessage = 'Error Adding claim: '+ error;
        this.showErrorAlert = true;
      });
  }

  goToClaimList(){
    console.log('Claim added successefully');
    window.location.reload();
  }

  onSubmit(){
    console.log(this.claim);
    this.saveClaim();
  }

}
