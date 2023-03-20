import { Component } from '@angular/core';
import { AuthService } from './core/services/auth';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stackoverflow';
  constructor(public auth:AuthService,private store:Store<any>){}
}
