// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class MovieService {

//   apiKey = "325be08aa92d074eb7536755cb3010ab";

//   constructor(private http: HttpClient) {}

//   getMovies(page:number){
//     return this.http.get(
//       `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&page=${page}`
//     );
//   }

// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apiKey = "325be08aa92d074eb7536755cb3010ab";
  baseUrl = "https://api.themoviedb.org/3";

  constructor(private http: HttpClient) {}

  // Popular Movies                           
  getMovies(page:number){
    return this.http.get(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`
    );
  }

  // Single Movie Details
  getMovieDetails(id:any){
    return this.http.get(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`
    );
  }

  // Movie Cast
  getMovieCast(id:any){
    return this.http.get(
      `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`
    );
  }

}