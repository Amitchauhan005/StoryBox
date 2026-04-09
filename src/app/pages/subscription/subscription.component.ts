import { Component } from '@angular/core';

@Component({
  selector: 'app-pages-subscription',
  // standalone: true,
  // imports: [],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {

  isYearly: boolean = false;

  setMonthly() {
    this.isYearly = false;
  }

  setYearly() {
    this.isYearly = true;
  }

}
