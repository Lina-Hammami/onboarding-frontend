import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Claim } from '../../models/claim';
import { Policy } from '../../models/policy';
import { Photo } from '../../models/photo';
import {ThemePalette} from '@angular/material/core';
import { PolicyService } from 'src/app/services/policy.service';


@Component({
  selector: 'app-claimdetails',
  templateUrl: './claimdetails.component.html',
  styleUrls: ['./claimdetails.component.css']
})
export class ClaimdetailsComponent {
  claim!: Claim;
  policy!: Policy;
  photos!: Photo[];
  status!: ['open', 'ongoing','closed'];
  background: ThemePalette = undefined;

  constructor(
    private route: ActivatedRoute, 
    private policyService: PolicyService
  ) {}

  ngOnInit() {

    let c  = history.state.claim;    
    this.claim = new Claim();
    this.claim.claimId = c.claimId;
    this.claim.claimNb = c.claimNb;
    this.claim.status = c.status;
    this.claim.accidentDate = c.accidentDate;
    this.claim.creationDate = c.creationDate;
    this.claim.policy = c.policy;
    this.claim.photos = c.photos;

    this.policy = this.claim.policy;
    this.photos = this.claim.photos;
    console.log(c);
 
    // this.route.queryParams.subscribe(params => {
    //   this.claims = params['claims'];
    //   console.log(this.claims);
    // });
  }

}
