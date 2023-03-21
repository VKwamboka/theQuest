import { Component , OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth';
import { AppState } from 'src/app/core/states/appState';
import { ToastComponent } from 'src/app/toast/toast.component';
@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent {
  constructor(public auth:AuthService,private store:Store<AppState>){}

  toastVisible = false;

  showToast() {
    this.toastVisible = true;
  }
  
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('menu toggled');
    
  }
  
}
