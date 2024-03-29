import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/core/actions/authActions';
import { AuthService } from 'src/app/core/services/auth';
import { AuthenticationService } from 'src/app/core/services/authentication';
import { AuthState } from 'src/app/core/states/authState';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  error = false;
  errorMessage = '';

  form!:FormGroup
  login$!:Observable<AuthState[]>
  // error=null
  constructor(private route: ActivatedRoute,private fb:FormBuilder, private authentication:AuthenticationService, private auth :AuthService,
    private router:Router, private store:Store<AuthState>
    ){

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      Password:[null, [Validators.required]],
      ConfirmPassword:[null, [Validators.required]]
    }) 

  }

  submitForm(){
    console.log(this.form.value)
    const resetToken = this.route.snapshot.queryParamMap.get('resetToken');
    console.log(resetToken)
    const updatePassword = {
      
      password: this.form.value,
      resetToken: resetToken,
    };
    // this.store.dispatch(login({userlogged:this.form.value}));
    this.authentication.resetPassword(updatePassword).subscribe((res)=>{
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
