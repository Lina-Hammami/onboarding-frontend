import { Component, OnInit, Input } from '@angular/core';
import { ClaimService } from 'src/app/services/claim.service';
import { Claim } from '../../models/claim';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyService } from 'src/app/services/policy.service';


@Component({
  selector: 'app-edit-claim',
  templateUrl: './edit-claim.component.html',
  styleUrls: ['./edit-claim.component.css']
})
export class EditClaimComponent {
  @Input() claimId!: number;
  @Input() policyNb!: string;
  claim: Claim = new Claim();
  pnumbers:String[]=[];
  errorMessage: string="";
  successMessage: string="";
  showErrorAlert: boolean = false;
  showSuccessAlert: boolean = false;


  constructor(private claimService: ClaimService,
    private policyService: PolicyService,
    private router: ActivatedRoute,
    private route: Router) { 
    
  }

  ngOnInit(){
    this.policyService.getAllNumbers().subscribe(numbers => {
      this.pnumbers = numbers;
      console.log(this.pnumbers);
    });
    this.router.queryParams.subscribe(params => {
      this.policyNb = params['policyNb'];
      this.claimId = params['claimId']; 
      console.log('Opens with policyNB:'+this.policyNb);
    });
    let c  = history.state.claim;    
    this.claim = new Claim();
    this.claim.claimId = c.claimId;
    this.claim.claimNb = c.claimNb;
    this.claim.status = c.status;
    this.claim.accidentDate = c.accidentDate;
    this.claim.creationDate = c.creationDate;
    this.claim.policy = c.policy;
    this.claim.photos = c.photos;

    this.claim.accidentDate = this.claim.accidentDate;
    
  }
  
  updateClaim(){
    this.policyService.getPolicyByNb(this.policyNb).subscribe(param => {
        console.log('Policy '+this.claim.policy);
        console.log('Claim to be sent '+this.claimId);
        this.claimService.updateClaim(this.claimId, this.claim).subscribe( data =>{
          console.log('claim edited: '+data);
          
          this.successMessage = 'Claim edited successefully ';
          this.showSuccessAlert = true;
          
          this.goToClaimList();
        },(error) => {
          console.log('Error updating claim: '+error);
          this.errorMessage = 'Error updating claim: '+ error;
          this.showErrorAlert = true;
        });
      },(error) => {
        console.log('Error updating claim: ' + error);
        this.errorMessage = 'Error updating claim: '+ error;
        this.showErrorAlert = true;
      });
  }

  goToClaimList(){
    console.log('Claim edited successefully');
    //this.route.navigate(['']);
  }

  onSubmit(){
    console.log(this.claim);
    this.updateClaim();
  }

}
