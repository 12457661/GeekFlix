import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from '../models/Movie';
import { Page } from '../models/Page';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  url:string = 'https://api.themoviedb.org/3/movie/';
  movieUrl:string = '?api_key=b45808cfc639faa44235410b835b0912&language=en-US';
  constructor(private http:HttpClient) { }

  getMovie(movieID):Observable<Movie> {
    return this.http.get<Movie>(this.url + movieID + this.movieUrl);
  }

  getSimilarMovies(movieID):Observable<Page> {
    return this.http.get<Page>(this.url + movieID + '/similar' + this.movieUrl);
  }
}
