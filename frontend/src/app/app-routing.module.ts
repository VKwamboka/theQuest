import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {path:'', loadComponent:()=>import('./landing-page/landing-page.component').then(l=>l.LandingPageComponent)},
  {path:'login', loadComponent:()=>import('./core/login/login.component').then(l=>l.LoginComponent)},
  {path:'register', loadComponent:()=>import('./core/signup/signup.component').then(l=>l.SignupComponent)},
  {path:'user', loadComponent:()=>import('./userdashboard/userdashboard.component').then(l=>l.UserdashboardComponent)},
  {path:'admin', loadComponent:()=>import('./adminashboard/adminashboard.component').then(l=>l.AdminashboardComponent)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
