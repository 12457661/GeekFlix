import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { Movie } from 'src/app/models/Movie';
import { MovieService } from 'src/app/services/movie.service';
import { Page } from 'src/app/models/Page';



@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  imageUrl:string = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';
  movieID:number;
  movie:Movie;
  similarMovies:Page;
  constructor(private movieService:MovieService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.movieID = parseInt(params.get('id'));
    });

    this.movieService.getMovie(this.movieID).subscribe(movie => {
      this.movie = movie;
    });

    this.movieService.getSimilarMovies(this.movieID).subscribe(page => {
      this.similarMovies = page;
    });
  }

  getImageUrl(): string {
    return this.imageUrl + this.movie.poster_path;
  }

  getSimilarImageUrl(num:number): string {
    return this.imageUrl + this.similarMovies.results[num].poster_path;
  }

  getMovieInfo(): string {
    return this.movie.id + this.movie.title + this.movie.overview + this.movie.release_date + this.movie.vote_average;
  }

  getBackdrop(): string {
    return this.imageUrl + this.movie.backdrop_path;
  }

  getMovie(movieID:number) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.movieID = parseInt(params.get('id'));
    });

    this.movieService.getMovie(this.movieID).subscribe(movie => {
      this.movie = movie;
    });
    this.movieService.getSimilarMovies(this.movieID).subscribe(page => {
      this.similarMovies = page;
    });
    this.router.navigateByUrl('/movie/' + movieID);
  }

}
