import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthenticationGuard } from './authentication.guard';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // whitelistedDomains: ["localhost:5212"],
        // blacklistedRoutes: []
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [
    AuthenticationGuard
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
