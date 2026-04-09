import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './logout.component.html'
})
export class NavbarComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token'); // JWT remove
    this.router.navigate(['/auth/login']); // redirect to login
  }
}