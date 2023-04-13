import { Component, Input } from '@angular/core';
import { Policy } from '../../models/policy'

@Component({
  selector: 'app-related-policy',
  templateUrl: './related-policy.component.html',
  styleUrls: ['./related-policy.component.css']
})
export class RelatedPolicyComponent {
  @Input() policy!: Policy;
  ngonInit(){
    console.log(this.policy);
  }
}
