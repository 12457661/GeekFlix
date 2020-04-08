import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userList:User[]
  registerUserData = {username:'', password: ''};
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    if(this.userService.getLoggedInUser() != null)
      this.router.navigate(['/']);
    this.userList = this.userService.getUsers();
  }
  
  registerUser() {
    console.log(this.userService.registerUser(this.registerUserData));
    location.reload();
  }

  keyDownFunction(event) {
    if(event.keyCode == 13)
      this.registerUser();
  }
}
