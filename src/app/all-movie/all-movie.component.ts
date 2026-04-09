// import { Component, ViewChild, ElementRef } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MovieService } from '../services/movie.service';

// @Component({
//   selector: 'app-all-movie',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './all-movie.component.html',
//   styleUrls: ['./all-movie.component.css']
// })
// export class AllMovieComponent {

//   movies:any[] = [];
//   currentPage = 1;
//   totalPages = 0;

//   @ViewChild('movieRow') movieRow!: ElementRef;

//   constructor(private movieService: MovieService){}

//   ngOnInit(){
//     this.getMovies(this.currentPage);
//   }

//   getMovies(page:number){
//   this.movieService.getMovies(page).subscribe((res:any)=>{

//     this.movies = [...this.movies, ...res.results];

//     this.totalPages = res.total_pages;
//   });
// }

//   changePage(page:number){
//     this.currentPage = page;
//     this.getMovies(page);
//   }

//   scrollNext(){

//   if(this.currentPage < this.totalPages){
//     this.currentPage++;
//     this.getMovies(this.currentPage);
//   }

//   this.movieRow.nativeElement.scrollLeft += 600;

// }

//   scrollPrev(){
//     this.movieRow.nativeElement.scrollLeft -= 600;
//   }

//   selectedMovie:any;

// openMovie(movie:any){
//   this.selectedMovie = movie;
// }



// }


import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-movie.component.html',
  styleUrls: ['./all-movie.component.css']
})
export class AllMovieComponent {

  movies:any[] = [];
  currentPage = 1;
  totalPages = 0;

  @ViewChild('movieRow') movieRow!: ElementRef;

  constructor(
    private movieService: MovieService,
    private router: Router
  ){}

  ngOnInit(){
    this.getMovies(this.currentPage);
  }

  getMovies(page:number){
    this.movieService.getMovies(page).subscribe((res:any)=>{

      // old + new movies add
      this.movies = [...this.movies, ...res.results];

      this.totalPages = res.total_pages;
    });
  }

  changePage(page:number){
    this.currentPage = page;
    this.getMovies(page);
  }

  // next scroll
  scrollNext(){

    if(this.currentPage < this.totalPages){
      this.currentPage++;
      this.getMovies(this.currentPage);
    }

    this.movieRow.nativeElement.scrollLeft += 600;

  }

  // previous scroll
  scrollPrev(){
    this.movieRow.nativeElement.scrollLeft -= 600;
  }

  // WATCH NOW CLICK
  openMovie(movie:any){

    // navigate to movie details page
    this.router.navigate(['/movie', movie.id]);

  }

}