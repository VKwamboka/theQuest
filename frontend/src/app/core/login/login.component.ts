import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, logout } from '../actions/authActions';
import { AuthService } from '../services/auth';
import { AuthenticationService } from '../services/authentication';
import { AuthState } from '../states/authState';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData = {
    name: '',
    email: '',
    password: ''
  };

  form!:FormGroup
  login$!:Observable<AuthState[]>
  error=null
  constructor(private fb:FormBuilder, private authentication:AuthenticationService, private auth :AuthService,
    private router:Router, private store:Store<AuthState>
    ){

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      Email:[null, [Validators.required, Validators.email]],
      Password:[null, Validators.required]
    })
   

  }

  submitForm(){
    this.authentication.loginUser(this.form.value).subscribe(response=>{
      this.auth.setRole(response.role)
      this.auth.setName(response.name)
      this.auth.login()
      localStorage.setItem('token', response.token)
      if(response.token){
        
        this.router.navigate(['book'])
      }
    },(error)=>{
    this.error=error.error.error
    })
    this.store.dispatch(login({userlogged:this.form.value}))
    console.log(this.form.value)
    // this.store.select('userl')
   
  }

  Close(){
    this.error=null
  }

 

  // logout with state
  onLogout() {
    this.store.dispatch(logout());
  }


}
