import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication';
import { Observable } from 'rxjs';
import { AuthState } from '../states/authState';
import { register } from '../actions/authActions';
import { AuthService } from '../services/auth';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  error = false;
  errorMessage = '';

  form!:FormGroup
  register$!:Observable<AuthState[]>

 
  constructor(private fb:FormBuilder,private authentication:AuthenticationService,private auth :AuthService, private router:Router, private store:Store<AuthState>){

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      Name:[null, Validators.required],
      Email:[null, [Validators.required, Validators.email]],
      Password:[null, Validators.required],
      confirmPassword:[null, Validators.required]
    })
  }

  submitForm(){
    console.log(this.form.value)
    this.authentication.registerUser(this.form.value).subscribe(response=>{
     
      this.auth.setRole(response.Role)
      this.auth.setName(response.Name)
      this.auth.login()
      localStorage.setItem('token', response.data.token)
      console.log(response.data.token)
      if(response.data.token){
       
        this.router.navigate(['/user'])
        
      }
  
    
    },(error)=>{
      this.errorMessage = error.error.message;
    })
    this.store.dispatch(register({userRegistered:this.form.value}))
 
  
    console.log('hey')
   
  }

  
}
