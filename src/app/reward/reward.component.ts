import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Day {
  label: string;
  reward: number;
  claimed: boolean;
  missed: boolean;
}

interface Referral {
  name: string;
  joined: boolean;
}

@Component({
  selector: 'app-reward',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css']
})
export class RewardComponent {

  userCoins: number = 120;

  // ✅ TOP ALERT (Check-in, copy etc.)
  topAlertMessage: string = '';
  topAlertType: string = '';
  showTopAlert: boolean = false;

  // ✅ ADS ALERT (Watch Ads)
  adsAlertMessage: string = '';
  adsAlertType: string = '';
  showAdsAlert: boolean = false;

  // ✅ ALERT FUNCTIONS
  showTopAlertBox(message: string, type: string) {
    this.topAlertMessage = message;
    this.topAlertType = type;
    this.showTopAlert = true;

    setTimeout(() => this.showTopAlert = false, 3000);
  }

  showAdsAlertBox(message: string, type: string) {
    this.adsAlertMessage = message;
    this.adsAlertType = type;
    this.showAdsAlert = true;

    setTimeout(() => this.showAdsAlert = false, 3000);
  }

  // =====================

  days: Day[] = [
    { label: 'Day 1', reward: 10, claimed: false, missed: false },
    { label: 'Day 2', reward: 20, claimed: false, missed: false },
    { label: 'Day 3', reward: 30, claimed: false, missed: false },
    { label: 'Day 4', reward: 40, claimed: false, missed: false },
    { label: 'Day 5', reward: 50, claimed: false, missed: false },
    { label: 'Day 6', reward: 60, claimed: false, missed: false },
    { label: 'Day 7', reward: 100, claimed: false, missed: false }
  ];

  referrals: Referral[] = [
    { name: 'Rahul', joined: false },
    { name: 'Aman', joined: false }
  ];

  referralCode: string = 'StoryBox50';
  ads: number[] = [5, 10, 20, 30, 40, 50];

  lastClaimDate: string | null = null;

  showShareOptions: boolean = false;
  generatedLink: string = '';

  getDayClass(day: Day) {
    return {
      claimed: day.claimed,
      missed: day.missed,
      active: !day.claimed && !day.missed
    };
  }

  // ✅ CHECK IN → TOP ALERT
  checkIn() {
    const todayDate = new Date().toDateString();

    if (this.lastClaimDate === todayDate) {
      this.showTopAlertBox('Already claimed today ❌', 'danger');
      return;
    }

    const today = this.days.find(d => !d.claimed && !d.missed);

    if (today) {
      today.claimed = true;
      this.userCoins += today.reward;
      this.lastClaimDate = todayDate;

      this.showTopAlertBox(`+${today.reward} coins added 🎉`, 'success');
    } else {
      this.showTopAlertBox('All rewards completed!', 'warning');
    }
  }

  // ✅ COPY → TOP ALERT
  copyCode() {
    navigator.clipboard.writeText(this.referralCode);
    this.showTopAlertBox('Code copied ✅', 'info');
  }

  copyLink() {
    navigator.clipboard.writeText(this.generatedLink);
    this.showTopAlertBox('Link copied 🔗', 'info');
  }

  openShare() {
    this.showShareOptions = true;
    this.generatedLink = `https://storybox.com/ref/${this.referralCode}`;
  }

  share(platform: string) {
    const link = this.generatedLink;
    const text = `Join now and earn rewards! Use my code: ${this.referralCode}`;

    let url = '';

    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + link)}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + ' ' + link)}`;
        break;
    }

    window.open(url, '_blank');
  }

  // ✅ WATCH AD → ADS ALERT (IMPORTANT FIX 🔥)
  watchAd(reward: number) {
    this.userCoins += reward;
    this.showAdsAlertBox(`+${reward} coins from ad 🎬`, 'success');
  }

  simulateJoin(i: number) {
    this.referrals[i].joined = true;
  }

  get joinedReferralsCount(): number {
    return this.referrals.filter(r => r.joined).length;
  }

  get totalEarned(): number {
    return this.joinedReferralsCount * 50;
  }

  shareNative() {
    const link = `https://yourapp.com/ref/${this.referralCode}`;
    const text = `Join now and earn rewards! Use my code: ${this.referralCode}`;

    if (navigator.share) {
      navigator.share({ title: 'Invite & Earn', text, url: link });
    } else {
      this.openShare();
    }
  }
}