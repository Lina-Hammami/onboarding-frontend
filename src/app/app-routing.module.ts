import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ClaimdetailsComponent } from './components/claimdetails/claimdetails.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AddPolicyComponent} from './components/add-policy/add-policy.component';
import {EditClaimComponent} from './components/edit-claim/edit-claim.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent,canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'claim_details', component: ClaimdetailsComponent},
  {path: 'add_policy', component: AddPolicyComponent},
  {path: 'edit_claim', component: EditClaimComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
