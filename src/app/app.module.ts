import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {ClaimdetailsComponent } from './components/claimdetails/claimdetails.component';
import {NavComponent} from './components/nav/nav.component';
import { RelatedPhotosComponent } from './components/related-photos/related-photos.component';
import { OneClaimDetailsComponent } from './components/one-claim-details/one-claim-details.component';
import { RelatedPolicyComponent } from './components/related-policy/related-policy.component';
import { AddClaimComponent } from './components/add-claim/add-claim.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './shared/authconfig.interceptor';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';
import { EditClaimComponent } from './components/edit-claim/edit-claim.component';
import { AddPolicyComponent } from './components/add-policy/add-policy.component';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    ClaimdetailsComponent,
    RelatedPhotosComponent,
    OneClaimDetailsComponent,
    RelatedPolicyComponent,
    AddClaimComponent,
    EditClaimComponent,
    AddPolicyComponent,
    DeleteConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    MatCardModule, 
    MatTabsModule, 
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatAutocompleteModule,
    NgbModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
