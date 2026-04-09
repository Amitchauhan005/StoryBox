import { CommonModule } from '@angular/common';
import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ReportModalComponent } from '../report-modal/report-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reel-card',
  templateUrl: './reel-card.component.html',
  styleUrls: ['./reel-card.component.css'],
  standalone: true,   
  imports: [CommonModule,FormsModule,ReportModalComponent],

})
export class ReelCardComponent implements AfterViewInit {

  @Input() reel: any;

  @ViewChild('videoPlayer') video!: ElementRef;

  isPlaying = true;
  isExpanded = false;
  isReportOpen = false;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.video.nativeElement.play()
            .then(() => this.isPlaying = true)
            .catch(() => this.isPlaying = false);
        } else {
          this.video.nativeElement.pause();
          this.isPlaying = false;
          this.isReportOpen = false;
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(this.video.nativeElement);
  }

  togglePlayPause() {
    const vid = this.video.nativeElement;

    if (this.isReportOpen) return;

    if (vid.paused) {
      vid.play();
      this.isPlaying = true;
    } else {
      vid.pause();
      this.isPlaying = false;
    }
  }

  openReport() {
    this.video.nativeElement.pause();
    this.isPlaying = false;
    this.isReportOpen = true;
  }
}