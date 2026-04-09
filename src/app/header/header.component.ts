import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  router = inject(Router);
  firebase = inject(FirebaseService);

  isLoggedIn = false;

  ngOnInit() {
    this.firebase.currentUser$.subscribe(user => {
      if (user === undefined) return;
      this.isLoggedIn = !!user;
    });
  }

  async onLogout() {
    await this.firebase.logout();
    this.router.navigate(['/auth/login']);
  }

  goHome() { this.router.navigate(['/home']); }
  goAbout() { this.router.navigate(['/about']); }
  goContact() { this.router.navigate(['/contact']); }
  goSubscription() { this.router.navigate(['/subscription']); }
  goShortVideos() { this.router.navigate(['/short-videos']); }
  goToLogin() { this.router.navigate(['/auth/login']); }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.custom-navbar');
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }

  menuOpen = false;
  searchOpen = false;
  loginOpen = false;

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  toggleSearch() { this.searchOpen = !this.searchOpen; }
  openLogin() { this.loginOpen = true; }
  closeLogin() { this.loginOpen = false; }
}