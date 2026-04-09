import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReelCardComponent } from './ui/reel-card/reel-card.component';
// import { MakeReelComponent } from './ui/make-reel/make-reel.component';

@Component({
  selector: 'app-short-videos',
  templateUrl: './short-videos.component.html',
  styleUrls: ['./short-videos.component.css'],
  standalone: true,
  imports: [CommonModule, ReelCardComponent,],
})
export class ShortVideosComponent {

  reels = [
  {
      id: 1,
      user: '@rahul_vibes',
      description: 'Mumbai ki subah ka maza hi alag hai! Yeh view dekh ke dil khush ho gaya 😍🌅',
      videoUrl: 'https://videos.pexels.com/video-files/8939902/8939902-hd_1080_1920_25fps.mp4',
      likes: 1200,
      shares: 340
    },
    {
      id: 2,
      user: '@priya_creates',
      description: 'DIY room decor banaya sirf 200 rupaye mein 🎨✨ Full tutorial dekho!',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      likes: 4500,
      shares: 890
    },
    {
      id: 3,
      user: '@chef_arjun',
      description: 'Ghar pe restaurant style Butter Chicken banao 10 minute mein 🍗🔥 Recipe comment mein hai!',
      videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_1440_2560_25fps.mp4',
      likes: 9800,
      shares: 2100
    },
    {
      id: 4,
      user: '@fitness_neha',
      description: 'Roz sirf 15 min yeh karo, 30 din mein farak dikhega 💪 No gym needed!',
      videoUrl: 'https://videos.pexels.com/video-files/6278669/6278669-uhd_1440_2560_25fps.mp4',
      likes: 15000,
      shares: 5600
    },
    {
      id: 5,
      user: '@travel_karan',
      description: 'Manali trip sirf ₹5000 mein? Haan possible hai! Budget breakdown👇🏔️❄️',
      videoUrl: 'https://videos.pexels.com/video-files/4812205/4812205-uhd_2160_4096_24fps.mp4',
      likes: 7600,
      shares: 3200
    }
  ];

}