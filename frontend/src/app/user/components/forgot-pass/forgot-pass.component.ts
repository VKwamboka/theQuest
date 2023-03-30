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
import { sendEmail } from '../../actions/answer';

@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule, HttpClientModule],
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

    }) 

  }

  submitForm(){
    console.log(this.form.value)
    // this.store.dispatch(login({userlogged:this.form.value}));
    this.authentication.forgotPassword(this.form.value).subscribe((res)=>{
      console.log(res)
    })
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
