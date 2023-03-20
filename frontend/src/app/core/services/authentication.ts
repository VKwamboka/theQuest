import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, LoginUser,LoginSuccess,Message, RegisterUser } from 'src/app/interfaces/user';
import{Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  registerUser(user:RegisterUser):Observable<LoginSuccess>{
    return this.http.post<LoginSuccess>('http://localhost:5500/auth/signup',user)
  }

  loginUser(user:LoginUser):Observable<LoginSuccess>{
    return this.http.post<LoginSuccess>('http://localhost:5500/auth/login',user)
  }

  updateUser(id:string,updatedUser:User):Observable<User>{
    return  this.http.put<User>(`http://localhost:5500/auth/user/${id}`, updatedUser)
   }

}