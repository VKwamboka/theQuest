import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-adminashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './adminashboard.component.html',
  styleUrls: ['./adminashboard.component.css']
})
export class AdminashboardComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('menu toggled');
    
  }
}
