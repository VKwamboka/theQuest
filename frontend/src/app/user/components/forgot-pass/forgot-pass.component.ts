import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { login, logout } from 'src/app/core/actions/authActions';
import { AuthService } from 'src/app/core/services/auth';
import { AuthenticationService } from 'src/app/core/services/authentication';
import { AuthState } from 'src/app/core/states/authState';

@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent {
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
      this.error = true;
      this.errorMessage = error.error.message;

      console.log(error.error.message)
    })
    
    // this.login$.subscribe(state => console.log(state));
    
  
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
