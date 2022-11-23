import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";
@Injectable({providedIn:"root"})
export class AuthenticatinInterceptor implements HttpInterceptor
{   constructor(
    private api:AuthenticationService
    ){}
    id:string="";
    user=this.api.user;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!this.user)
        {   console.log("Inside");
            return next.handle(req);
        }
        console.log("Outside");
        this.user.subscribe((user)=>{ 
            //console.log("Id is",user.token);
            this.id=user.token
        })
        const reqclone=req.clone({
            params:new HttpParams().set("auth",this.id)
        })
        //req.params.append("auth",this.id);
        console.log(reqclone);
        return next.handle(reqclone);
    }
}