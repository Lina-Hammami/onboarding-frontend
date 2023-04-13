import { Component, Input } from '@angular/core';
import { Claim } from '../../models/claim';
import { ClaimService } from 'src/app/services/claim.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-one-claim-details',
  templateUrl: './one-claim-details.component.html',
  styleUrls: ['./one-claim-details.component.css']
})
export class OneClaimDetailsComponent {
  @Input() claim!: Claim;
  
  constructor(private claimService: ClaimService,
    private router: Router) { }

}
