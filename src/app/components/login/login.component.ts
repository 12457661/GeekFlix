import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFail:boolean = false;
  userList:User[]
  loginUserData = {username:'', password:''};

  constructor(private userService:UserService, private router: Router) { }

  ngOnInit(): void {
    if(this.userService.getLoggedInUser() != null)
      this.router.navigate(['/']);
    this.userList = this.userService.getUsers();
  }

  loginUser() {
    let user = this.userService.loginUser(this.loginUserData);
    if(user == null){
      console.log('Login unsuccessful');
      this.loginFail = true;
    }
    else
    {
      console.log('success');
      location.reload();
    }
  }

  keyDownFunction(event) {
    if(event.keyCode == 13)
      this.loginUser();
  }

  getLoginFail() {
    return this.loginFail;
  }
}
