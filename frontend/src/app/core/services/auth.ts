import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  isLoggedIn=false
  private role=''
  private name=''
  private id=''


  getName(){
  return this.name
  }

getRole(){
    return this.role
    }
    getId(){
      return this.id
    }

    setRole(role:string){
      this.role=role
    }
    setName(name:string){
      this.name=name
    }
    setId(id:string){
      this.id=id
    }

  getAuthStatus():Promise<boolean>{
    const promise = new Promise<boolean>((resolve,reject)=>{
    setTimeout(()=>{
      resolve(this.isLoggedIn)
    },10)
    })
    return promise;
  }

  login(){
    this.isLoggedIn=true
  }

  logout(){
    this.isLoggedIn=false;
    localStorage.removeItem('token')
  }
}