import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup ;
  formGroup!: FormGroup ;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  submit(): void {
    console.log(this.form.getRawValue());
    this.http.post('http://localhost:8080/api/auth', this.form.getRawValue(), {
      withCredentials: true
    }).subscribe((res:any) => {
      localStorage.setItem('access_token', res['token']);
      return res;});

    //.subscribe(() => this.router.navigate(['/']));
  }
}
