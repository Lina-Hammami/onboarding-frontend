import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {HttpClient} from '@angular/common/http';
import {Emitters} from '../../emitters/emitters';
import {Claim, Status} from '../../models/claim'
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { ClaimService } from 'src/app/services/claim.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = '';
  nbFilter='';
  statusFilter=Status.open;
  showAddClaim:Boolean=false;
  claims!: Claim[];
  filtClaims!: Claim[];
  Status = Status;
  unfilteredClaims!: Claim[];
  deleteConfirmed = false;
  errorMessage: string="";
  successMessage: string="";
  showErrorAlert: boolean = false;
  showSuccessAlert: boolean = false;

  constructor(
    private claimService: ClaimService,
    private modalService: NgbModal,
    private http: HttpClient, 
    private router: Router
  ) {}

  toggleShow(){
    this.showAddClaim=!this.showAddClaim;
    console.log('ToggleShow:'+this.showAddClaim);
  }
  showAddPolicy(){
    this.router.navigate(['/add_policy']);
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/claims/list', {withCredentials: true}).subscribe(
      (res: any) => {
        this.claims=res;
        this.claims.sort((val1, val2)=> {return (new Date(val2.creationDate) as any) - (new Date(val1.creationDate) as any)});
        Emitters.authEmitter.emit(true);
        this.unfilteredClaims = this.claims;
      },
      err => {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
        this.errorMessage = 'No claims found';
        this.showErrorAlert = true;
      }
    );
    this.filtClaims=this.claims;
  }

  openClaim(id:number) {
    console.log('listof claims:'+this.claims);
    this.router.navigate(['/claim_details'],{ 
      state: { claim: this.claims.find(c=>c.claimId==id) }, 
      queryParams: { msg:'passing a claim data' }
    });
  }

  updateClaim(id: number){
    this.router.navigate(['edit_claim'], {
      state: { claim: this.claims.find(c=>c.claimId==id)} , 
      queryParams: { claimId: this.claims.find(c=>c.claimId==id)?.claimId,
        policyNb: this.claims.find(c=>c.claimId==id)?.policy.policyNb}
    });
  }

  deleteClaim(id: number){
    const modalRef = this.modalService.open(DeleteConfirmationComponent);
    modalRef.result.then(
      (result) => {
        console.log(result);
        // Delete confirmed
        // Call the delete method here
      },
      () => {
        // Delete canceled
        console.log('Claim deleting canceled');
      }
    );
    modalRef.componentInstance.deleteConfirmed.subscribe(
      (confirmed:boolean) => {
        this.deleteConfirmed = confirmed;
        this.claimService.deleteClaim(id).subscribe( data => {
          console.log('Claim deleted successefully '+data);
          window.location.reload();
          this.successMessage = 'Claim deleted successefully ';
          this.showSuccessAlert = true;
        })
      },(error:any) => {
        this.errorMessage = 'Error deleting claim';
        this.showErrorAlert = true;
      }
    );
  }

  get filteredClaims(): Claim[] {
    return this.claims.filter((claim) => {
      const nbMatch = claim.claimNb.toLowerCase().includes(this.nbFilter.toLowerCase());
      const statusMatch = this.statusFilter ? claim.status == this.statusFilter : true;
      console.log(this.statusFilter);
      return nbMatch && statusMatch;
    });
  }

  doFiltererClaims() {
    this.claims = this.unfilteredClaims;
    this.claims = this.filteredClaims;
  }

  // showPopup() {
  //   this.showDeletePopup = true;
  // }

  // hidePopup() {
  //   this.showDeletePopup = false;
  // }
  
}
