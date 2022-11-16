import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
   })
export class AuthenticationService
{   constructor(
    private http:HttpClient
    ){}
    signup(email:string,password:string)
    {   let postData={ "email":`${email}`,"password":`${password}`,"returnSecureToken":true};
        console.log(postData);
        this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZ2z8jrV1VvgN7XGHzZ-7sFrZzalP5OlQ',
        {
            email:email,
            password: password,
            returnSecureToken: true
        }).subscribe((data)=>{
            console.log("THis is Data");
            console.log(data);
        }); 
    }
    public login(email:string,password:string)
    {
        this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZ2z8jrV1VvgN7XGHzZ-7sFrZzalP5OlQ',
        {
            email:email,
            password: password,
            returnSecureToken: true
        }).subscribe((data)=>{
            console.log("THis is Login");
            console.log(data);
        });
    }
}