import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Movie } from '../models/Movie';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  getUsers():User[]{
      let userList: User[] = JSON.parse(localStorage.getItem('userList'))
        return userList;
  }

  registerUser(user):string {
    let userList: User[] = this.getUsers();
    let newUser:User = {
      id: userList.length+1,
      username: user.username,
      password: user.password,
      moviesWithEmotion: [
        {
          emotion: 'happy',
          movies: []
        },
        {
          emotion: 'sad',
          movies: []
        },
        {
          emotion: 'wow',
          movies: []
        },
        {
          emotion: 'crazy',
          movies: []
        }
      ]
    };
    userList.push(newUser);
    this.store(userList);
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));  
    return 'Success';
  }

  store(input:User[]) {
    localStorage.setItem('userList', JSON.stringify(input));   
  }

  loginUser(loginUserData): User{
    let returnedUser:User = null;
    let userList: User[] = this.getUsers();
    userList.forEach(user => {
      if(user.username === loginUserData.username && user.password === loginUserData.password)
        returnedUser = user;
    });
    localStorage.setItem('loggedInUser', JSON.stringify(returnedUser));   
    return returnedUser;
  }

  getLoggedInUser(): User {
    return JSON.parse(localStorage.getItem('loggedInUser'));
  }

  logOut() {
    localStorage.setItem('loggedInUser', null);
  }

  addEmotionMovie(movie:Movie, emotion:string) {
    let user = this.getLoggedInUser();
    user.moviesWithEmotion.forEach(emotionList => {
      if(emotionList.emotion === emotion)
      {
        emotionList.movies.push(movie);
      }
    });
    let userList = this.getUsers();
    userList.forEach(userInList => {
      if(userInList.id == user.id)
        userInList = user;
    });
    localStorage.setItem('loggedInUser', JSON.stringify(user));   
    this.store(userList);

  }
}
