import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../login/authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
 // @ViewChild('inputForm') form:NgForm;
  myForm:any;
  results:Object | undefined;
  constructor(
    private route:Router,
    private activated:ActivatedRoute,
    private api:AuthenticationService
  ) {}
  ngOnInit(): void {
    this.myForm=new FormGroup({
      title:new FormControl(''),
      description:new FormControl('')
    })
   this.api.getData().subscribe((data)=>{
      this.dataStoring(data);
    })
    //console.log("THis is Second");
    //console.log("This is Results"+this.results.)
    //localStorage.setItem("TestData",JSON.stringify(this.results));
  }
  AfterChanging(){
    this.api.getData().subscribe((data)=>{
      this.dataStoring(data);
    })
  }
  dataStoring(data:Object)
  {
    this.results=data;
  }
  Logout(){
    if(localStorage.getItem("UserDetails")!=null)
      localStorage.removeItem("UserDetails");
      this.route.navigate(['']);
  }
  Back()
  {
    this.route.navigate([this.activated.parent]);
  }
  Submit(form:FormGroup)
  {
    //console.log(form);
    var data=this.api.add({title:form.value.title,description:form.value.description})
    data.subscribe((data)=>{
      console.log("This is Response"+data); 
    this.AfterChanging();
    })
    console.log(this.results);
    form.reset();
  }
}
