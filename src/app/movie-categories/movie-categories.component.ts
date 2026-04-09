import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-categories.component.html',
  styleUrl: './movie-categories.component.css'
})
export class MovieCategoriesComponent {

  categories = [
    {
      title: 'New Movies',
      movies: [
        { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/n1.jpg', name: 'The Haunted Sisters' },
        { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/new-m2.png', name: 'The Missing Piece' },
        { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/new-m3.jpg', name: 'Love Went Quiet Before I Did' },
        { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/new-m4.jpg', name: 'For the Family That Chose Me' },
        { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/new-m5.jpg', name: 'No More Lies, No More Tears' },
      ]
    },
    {
      title: 'Suspense',
      movies: [
        { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/suspense-m1.jpg', name: 'The Missing Piece' },
        { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/suspense-m2.jpg', name: 'The Haunted Sisters' },
        { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/suspense-m3.jpg', name: 'The Haunted Sisters' },
      ]
    },
    {
      title: 'Romance',
      movies: [
        { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/rm-1.jpg', name: 'Miss You After Goodbye' },
        { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/rm-2.jpg', name: 'No More Lies, No More Tears' },
        { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/rm-3.jpg', name: 'For the Family That Chose Me' },
        { img: 'https://storybox-media-am123.s3.eu-north-1.amazonaws.com/StoryBox-img_S3/rm-4.jpg', name: 'Love Went Quiet Before I Did' },
      ]
    }
  ];

}






