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
      Password:[null, [Validators.required]],

      // Password:[null, [Validators.required, Validators.minLength(8)]],
    }) 

  }

  submitForm(){
    console.log(this.form.value)


    this.store.dispatch(login({userlogged:this.form.value}));
    this.authentication.loginUser(this.form.value).subscribe(response=>{
     
      this.auth.setRole(response.Role)
      this.auth.setName(response.Name)
      this.auth.login()
      localStorage.setItem('token', response.data.token)

      if(response.data.token  && response.Role == 'user'){
       
        this.router.navigate(['/user'])
        console.log(response.Name)
      }
      else if(response.data.token && response.Role == 'admin'){
        this.router.navigate(['/admin'])
      }
    
    },(error)=>{
      this.errorMessage = error.error.message;
    })
    
    this.login$.subscribe(state => console.log(state));
    
  
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
