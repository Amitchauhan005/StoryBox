import { Component } from '@angular/core';
import { TrendingMoviesComponent } from '../../trending-movies/trending-movies.component';
import { MovieCategoriesComponent } from '../../movie-categories/movie-categories.component';
import { FeaturesFaqComponent } from '../../features-faq/features-faq.component';
import { AllMovieComponent } from '../../all-movie/all-movie.component';
import { MovieDetailComponent } from '../../movie-detail/movie-detail.component';
import { AuthenticationModule } from '../../authentication/authentication.module';
// import { MakeReelComponent } from '../../short-videos/ui/make-reel/make-reel.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TrendingMoviesComponent, MovieCategoriesComponent, FeaturesFaqComponent, AllMovieComponent,MovieDetailComponent,AuthenticationModule],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
