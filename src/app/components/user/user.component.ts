import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Movie } from 'src/app/models/Movie';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']

})
export class UserComponent implements OnInit {
  user:User;
  imageUrl:string = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser();
    if( this.user == null)
      this.router.navigateByUrl('login');
    this.user.moviesWithEmotion.forEach(emotion => {
      if(emotion.movies.length == 0)
        console.log(emotion.emotion + ' is empty');
      else
        emotion.movies.forEach(movie => {
        console.log(movie.title);
      });
    });
      console.log('done');
  }

  drop(event: CdkDragDrop<string[]>, emotion: string): void {
    let index;
    if(emotion === 'happy')
      index = 0;

    if(emotion === 'sad')
    index = 1;

    if(emotion === 'wow')
      index = 2;

    if(emotion === 'angry')
    index = 3;

    moveItemInArray(this.user.moviesWithEmotion[index].movies, event.previousIndex, event.currentIndex);
  }

  openMovie(movieID: number) {
    this.router.navigateByUrl('/movie/' + movieID);
  }

  getImageUrl(movieUrl:string): string {
    return this.imageUrl + movieUrl;
  }
}
