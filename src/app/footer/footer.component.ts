import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

   constructor(private router: Router) {}

  goToAbout() {
    this.router.navigate(['/about']);
  }

  goToContact() {
    this.router.navigate(['/contact']);
  }

   goTosubscription() {
    this.router.navigate(['/subscription']);
  }

  goToPrivacyPolicy() {
    this.router.navigate(['/privacy-policy']);
  }

  goToTermsOfService() {
    this.router.navigate(['/terms-of-service']);
  }

  goToReturnRefund() {
    this.router.navigate(['/return-refund']);
  }
  
}
