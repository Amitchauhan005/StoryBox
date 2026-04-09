import { Component, NgModule,OnInit  } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MovieCategoriesComponent } from './movie-categories/movie-categories.component';
import { TrendingMoviesComponent } from './trending-movies/trending-movies.component';
import { FeaturesFaqComponent } from './features-faq/features-faq.component';
// import { AboutComponent } from './pages/about/about.component';
// import { ContactComponent } from './pages/contact/contact.component';
// import { SubscriptionComponent } from './pages/subscription/subscription.component';
// import { HomeComponent } from './pages/home/home.component';
import { AllMovieComponent } from './all-movie/all-movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { PlayerComponent } from './player/player.component';
import { CommonModule } from '@angular/common';
import { FirebaseService } from './services/firebase.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent,FooterComponent,MovieCategoriesComponent,TrendingMoviesComponent,FeaturesFaqComponent,AllMovieComponent,MovieDetailComponent,PlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})


export class AppComponent implements OnInit {

  title = 'StoryBox';
  currentUser: any = null;

  constructor(
    private router: Router,
    private firebase: FirebaseService   
  ) {}

 ngOnInit() {
  this.firebase.currentUser$.subscribe((user: any) => {
    this.currentUser = user;

    //  undefined matlab Firebase abhi check kar raha hai — wait karo
    if (user === undefined) return;

    //  null matlab pakka logout hai — tab redirect karo
    if (user === null && !this.isAuthPage()) {
      this.router.navigate(['/auth/login']);
    }
  });
}

  //  header/footer hide for auth pages
  isAuthPage(): boolean {
    return this.router.url.includes('/auth');
  }

  //  footer hide for short videos
  isShortVideosPage(): boolean {
    return this.router.url.includes('short-videos'); 
  }
}