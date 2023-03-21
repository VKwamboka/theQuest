import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { allusers } from 'src/app/core/reducers/authReducers';
import { AuthService } from 'src/app/core/services/auth';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAllUsers } from 'src/app/core/actions/authActions';
import { User } from 'src/app/interfaces/user';
import { AppState } from 'src/app/core/states/appState';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {
  users$!:Observable<User[]>
  constructor(public auth:AuthService, private store:Store<AppState>){}

  ngOnInit(): void {
    // get users
    this.users$ = this.store.select(allusers)
    this.store.dispatch(getAllUsers())
    console.log(this.users$)
  }
}
