import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { login, logout } from '../actions/authActions';
import { AuthService } from '../services/auth';
import { AuthenticationService } from '../services/authentication';
import { AuthState } from '../states/authState';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // formData = {
  //   name: '',
  //   email: '',
  //   password: ''
  // };
  // private tokenKey = 'token';
  error = false;
  errorMessage = '';

  form!:FormGroup
  login$!:Observable<AuthState[]>
  // error=null
  constructor(private fb:FormBuilder, private authentication:AuthenticationService, private auth :AuthService,
    private router:Router, private store:Store<AuthState>
    ){

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      Email:[null, [Validators.required, Validators.email]],
      Password:[null, [Validators.required, Validators.minLength(8)]],
    }) 

  }

  submitForm(){
    console.log(this.form.value)
    this.authentication.loginUser(this.form.value).subscribe(response=>{
     
      this.auth.setRole(response.role)
      this.auth.setName(response.name)
      this.auth.login()
      localStorage.setItem('token', response.data.token)
      if(response.data.token){
        
        this.router.navigate(['/user'])
      }
    
    },(error)=>{
      this.errorMessage = error.error.message;
    })
    this.store.dispatch(login({userlogged:this.form.value}))
    console.log(this.form.value)
  
    console.log('hey')
   
  }

  Close(){
    this.error=false;
  }

 

  // logout with state
  onLogout() {
    this.store.dispatch(logout());
  }


}
