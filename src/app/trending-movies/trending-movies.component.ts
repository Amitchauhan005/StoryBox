import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-trending-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trending-movies.component.html',
  styleUrls: ['./trending-movies.component.css']
})
export class TrendingMoviesComponent implements OnInit, OnDestroy {

  movies = [
    { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/trend-m1.jpeg' },
    { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/trend-m2.jpeg' },
    { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/trend-m3.jpeg' },
    { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/trend-m4.jpeg' },
    { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/trend-m5.jpeg' },
    { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/trend-m6.jpeg' },
    { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/trend-m7.jpeg' },
    { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/trend-m8.jpeg' },
    { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/trend-m9.jpeg' },
    { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/trend-m10.jpeg' },
    { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/trend-m11.jpeg' },
    { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/trend-m12.jpeg' },
    { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/trend-m13.jpeg' },
    { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/trend-m14.jpeg' },
  ];

  chunkSize = 5;

  ngOnInit() {
    this.updateChunkSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateChunkSize();
  }

  updateChunkSize() {
    const width = window.innerWidth;
    if (width <= 480) {
      this.chunkSize = 1;       // Mobile small - 1 card
    } else if (width <= 768) {
      this.chunkSize = 2;       // Mobile large - 2 cards
    } else if (width <= 992) {
      this.chunkSize = 3;       // Tablet - 3 cards
    } else {
      this.chunkSize = 5;       // Desktop - 5 cards
    }
  }

  get movieChunks() {
    const chunks = [];
    for (let i = 0; i < this.movies.length; i += this.chunkSize) {
      chunks.push(this.movies.slice(i, i + this.chunkSize));
    }
    return chunks;
  }

  ngOnDestroy() {}

}