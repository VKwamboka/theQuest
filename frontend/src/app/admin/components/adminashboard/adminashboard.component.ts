import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth';

@Component({
  selector: 'app-adminashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './adminashboard.component.html',
  styleUrls: ['./adminashboard.component.css']
})
export class AdminashboardComponent {

  constructor(public auth:AuthService){}
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('menu toggled');
    
  }
}
