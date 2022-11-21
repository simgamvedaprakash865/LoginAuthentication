import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface User{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:string
}
@Injectable({
    providedIn: 'root',
   })
export class AuthenticationService
{   constructor(
    private http:HttpClient
    ){}
    public signup(email:string,password:string)
    {   let postData={ "email":`${email}`,"password":`${password}`,"returnSecureToken":true};
        console.log(postData);
        return this.http.post<User>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZ2z8jrV1VvgN7XGHzZ-7sFrZzalP5OlQ',
        {
            email:email,
            password: password,
            returnSecureToken: true
        }); 
    }
    public login(email:string,password:string)
    {
        return this.http.post<User>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZ2z8jrV1VvgN7XGHzZ-7sFrZzalP5OlQ',
        {
            email:email,
            password: password,
            returnSecureToken: true
        });
    }
}