import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserModel } from './user.model';
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
export class AuthenticationService implements CanActivate
{   constructor(
    private http:HttpClient,
    private route:Router
    ){
    }
    expireTime:Date=new Date();
    user=new BehaviorSubject<any>(1);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(localStorage.getItem("UserDetails")!=null )
        { 
            var data=JSON.parse(localStorage.getItem("UserDetails")||'');
            const date=new Date(new Date().getTime()+ +data.expiresIn*1000);
            var r=new UserModel(data.email,data.localId,data.idToken,date)
            this.user.next(r);
            return true;
        }
        else
        {
            // this.route.navigate(['']);
            // return false;
            return this.route.createUrlTree(['']);
        }
    }
    public signup(email:string,password:string)
    {   let postData={ "email":`${email}`,"password":`${password}`,"returnSecureToken":true};
        console.log(postData);
        var data=this.http.post<User>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZ2z8jrV1VvgN7XGHzZ-7sFrZzalP5OlQ',
        {
            email:email,
            password: password,
            returnSecureToken: true
        }).pipe(tap((data)=>{
            const date=new Date(new Date().getTime()+ +data.expiresIn*1000);
            const user=new UserModel(data.email,data.localId,data.idToken,date);
            this.user.next(user);
        }))
        //this.user.next(data);
        return data; 
    }
    public login(email:string,password:string)
    {
        var data=this.http.post<User>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZ2z8jrV1VvgN7XGHzZ-7sFrZzalP5OlQ',
        {
            email:email,
            password: password,
            returnSecureToken: true
        }).pipe(tap((data)=>{
            const date=new Date(new Date().getTime()+ +data.expiresIn*1000);
            const user=new UserModel(data.email,data.localId,data.idToken,date);
            this.user.next(user);
        }))
        return data;
    }
    public add(data:{title:string,description:string})
    {   return this.http.put(`https://login-1fe0f-default-rtdb.firebaseio.com/data/${data.title}.json`,data);
        
        //console.log(response);
    }
    public getData(){
        return this.http.get("https://login-1fe0f-default-rtdb.firebaseio.com/data.json");
    }
}