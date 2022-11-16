import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

   constructor( private authAPI:AuthenticationService) { }
 // @ViewChild('signupForm') public signup: any;
  loginpage=false;
  Invert()
  {
    this.loginpage=!this.loginpage;
  }
  ngOnInit() {}
  Submit(form:NgForm)
  {
    if(this.loginpage)
    {
      this.authAPI.login(form.value.email,form.value.password);
      form.reset();
    }
    else
    {
      this.authAPI.signup(form.value.email,form.value.password);
      form.reset();
    }
  }
}
