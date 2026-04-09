// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-movie-detail',
//   standalone: true,
//   imports: [],
//   templateUrl: './movie-detail.component.html',
//   styleUrl: './movie-detail.component.css'
// })
// export class MovieDetailComponent {

// }

import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {

  movie:any;
  cast:any[]=[];

  constructor(
    private route:ActivatedRoute,
    private movieService:MovieService
  ){}

  ngOnInit(){

    const id = this.route.snapshot.paramMap.get('id');

    if(id){

      this.movieService.getMovieDetails(id).subscribe((res:any)=>{
        this.movie = res;
      });

      this.movieService.getMovieCast(id).subscribe((res:any)=>{
        this.cast = res.cast.slice(0,3);
      });

    }

  }

}