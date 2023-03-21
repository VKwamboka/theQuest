import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req:HttpRequest<any> , next:HttpHandler){
    if(req.url!=='http://localhost:5500/auth/login'){
      const token = localStorage.getItem('token') as string
      console.log(token)
    let modifiedReq= req.clone({headers:req.headers.set('Authorization','Bearer ' + token).append('token', token)})
    return next.handle(modifiedReq)
    }
    return next.handle(req)
  }
}