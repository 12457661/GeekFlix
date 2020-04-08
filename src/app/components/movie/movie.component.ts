import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { Movie } from 'src/app/models/Movie';
import { MovieService } from 'src/app/services/movie.service';
import { Page } from 'src/app/models/Page';
import { Emotion } from 'src/app/models/Emotion';
import { UserService } from 'src/app/services/user.service';



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
  emotions:Emotion;
  happy:boolean;
  sad:boolean;
  wow:boolean;
  crazy:boolean;


  constructor(private movieService:MovieService, private route: ActivatedRoute, private router: Router, private userService: UserService) { }
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
    this.emotions = new Emotion;
    this.retrieve();

    this.happy = this.getUserEmotionMovies('happy');
    this.sad = this.getUserEmotionMovies('sad');
    this.wow = this.getUserEmotionMovies('wow');
    this.crazy = this.getUserEmotionMovies('crazy');
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

  
  store() {
    localStorage.setItem(this.movieID.toString(), JSON.stringify(this.emotions));   
  }
  

  retrieve() {
    let emotions: Emotion = JSON.parse(localStorage.getItem(this.movieID.toString()))
    if (emotions != null)
      this.emotions = emotions;
    else {
      this.emotions.crazy = 0;
      this.emotions.happy = 0;
      this.emotions.sad = 0;
      this.emotions.wow = 0;
    }
  }

  getEmotions(emotion:string):Number {
    if(emotion === 'happy')
      return this.emotions.happy;
    if(emotion === 'sad')
      return this.emotions.sad;
    if(emotion === 'crazy')
      return this.emotions.crazy;
    if(emotion === 'wow')
      return this.emotions.wow;
    return 0;
  }

  addEmotion(emotion:string):void {
    if(this.userService.getLoggedInUser() == null)
      this.router.navigateByUrl('login');

    if(emotion === 'happy') {
      this.userService.addEmotionMovie(this.movie, 'happy');
      this.emotions.happy++;
    }
    if(emotion === 'sad') {
      this.userService.addEmotionMovie(this.movie, 'sad');
      this.emotions.sad++;
    }
    if(emotion === 'crazy') {
      this.userService.addEmotionMovie(this.movie, 'crazy');
      this.emotions.crazy++;
    }
    if(emotion === 'wow') {
      this.userService.addEmotionMovie(this.movie, 'wow');
      this.emotions.wow++;
    }
    this.store();
  }
  unoSwitchCard(emotion:string) {
    if(emotion == 'happy')
      this.happy = !this.happy;
    if(emotion == 'sad')
      this.sad = !this.sad;
    if(emotion == 'wow')
      this.wow = !this.wow;
    if(emotion == 'crazy')
      this.crazy = !this.crazy;

      let userEmotionMovies = this.userService.getLoggedInUser().moviesWithEmotion;
      let k;
      for(k = 0; k < userEmotionMovies.length; k++)
      {
          if(userEmotionMovies[k].emotion == emotion) {
            let arraySize = userEmotionMovies[k].movies.length;
            console.log('size of array ' + arraySize);
            let i;
            for(i = 0; i < userEmotionMovies[k].movies.length; i++)
            {              
              if(userEmotionMovies[k].movies[i].id == this.movieID)
              {
                userEmotionMovies[k].movies.splice(i,1);
              }
            }
            if(arraySize == userEmotionMovies[k].movies.length)
            {
              userEmotionMovies[k].movies.push(this.movie);
            }
            console.log('size of array ' + userEmotionMovies[k].movies.length);

          }
      }
      let tempUser = this.userService.getLoggedInUser();
      tempUser.moviesWithEmotion = userEmotionMovies;
    localStorage.setItem('loggedInUser', JSON.stringify(tempUser));
    let userList = this.userService.getUsers();
    userList.forEach(userInList => {
      if(userInList.id == this.userService.getLoggedInUser().id)
        userInList = this.userService.getLoggedInUser();
    });   
    this.userService.store(userList);
  }

  getUserEmotionMovies(emotion:string):boolean{
    let result = false;
    let userEmotionMovies = this.userService.getLoggedInUser().moviesWithEmotion;
    userEmotionMovies.forEach(emotionMovies => {
      if(emotionMovies.emotion == emotion) {
        emotionMovies.movies.forEach(emotionMovie => {
          if(this.movieID == emotionMovie.id)
          {
            result = true;
          }
        });
      }
    });
    return result;
  }
}

