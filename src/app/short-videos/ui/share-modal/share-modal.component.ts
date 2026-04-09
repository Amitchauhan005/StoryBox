import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html'
})
export class ShareModalComponent {

  @Input() reel: any;
  @Output() close = new EventEmitter();

  copyLink() {
    navigator.clipboard.writeText(this.reel.videoUrl);
    alert('Link copied!');
  }

  shareWhatsApp() {
    window.open(`https://wa.me/?text=${this.reel.videoUrl}`);
  }

  shareTelegram() {
    window.open(`https://t.me/share/url?url=${this.reel.videoUrl}`);
  }
}