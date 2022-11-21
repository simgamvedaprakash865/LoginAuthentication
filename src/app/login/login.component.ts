import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService, User } from './authentication.service';
import {Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

   constructor( 
     private authAPI:AuthenticationService,
      private router:Router
     ) { }
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
      this.router.navigate(['/home']);
      this.isLoading=false;
    },(error:any)=>{
      this.errorMessage="An Error Occured";
      this.isLoading=false;
    });
  }
}
