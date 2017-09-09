import { SpinnerService } from '../../loader/spinner/spinner.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public responseMsg: String = '';
  loginForm: FormGroup;
  private username: AbstractControl;
  private password: AbstractControl;

  constructor(fb: FormBuilder,
    private http: Http,
    private loginService: LoginService,
    private spinner: SpinnerService,
    private router: Router,
  ) {
    this.loginForm = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    });
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['description'];
    this.spinner.show();
  }

  ngOnInit() {
    this.spinner.hide(1000);
  }

  onSubmit(values): any {
    this.spinner.show()
    this.loginService.authenticate(values).then((response) => {
      this.spinner.show();
      // console.log(response);
      this.router.navigate(['/dashboard']);      
    }).catch(error => {
      if (error.status == 401) {
        this.responseMsg = "The user credentials is incorrect";
      }
      this.spinner.hide();
    });
  } 

}
