import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService, User } from './authentication.service';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

   constructor( private authAPI:AuthenticationService) { }
 // @ViewChild('signupForm') public signup: any;
  loggedInUser:any;
  loginpage=false;
  isLoading=false;
  errorMessage="";
  Invert()
  {
    this.loginpage=!this.loginpage;
  }
  ngOnInit() {}
  Submit(form:NgForm)
  { this.isLoading=true;
    if(this.loginpage)
    {
     this.loggedInUser= this.authAPI.login(form.value.email,form.value.password);
      this.Subscribing();
      form.reset();
    }
    else
    {
      this.loggedInUser=this.authAPI.signup(form.value.email,form.value.password);
      this.Subscribing();
      form.reset();
    }
  }
  Subscribing(){
    
    this.loggedInUser.subscribe((data:any)=>{
      console.log(data);
    },(error:any)=>{
      this.errorMessage="An Error Occured";
    });
    this.isLoading=false;
  }
}
