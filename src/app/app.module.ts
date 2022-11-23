import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {LoginComponent} from './login/login.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; 
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthenticatinInterceptor } from './login/authentication.Interceptor';
@NgModule({
  declarations: [AppComponent,LoginComponent],
  imports: [BrowserModule, IonicModule.forRoot({mode:"md"}), AppRoutingModule,FormsModule,HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{provide:HTTP_INTERCEPTORS, useClass:AuthenticatinInterceptor,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
