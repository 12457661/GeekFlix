import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { User } from '../../../models/User';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:User = null;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser();
  }

  getHome(): void {
    location.reload();
  }

  loggedIn(): boolean {
    return this.user != null;
  }

  logOut() {
    this.userService.logOut();
    location.reload();
  }

  getUser() {
    this.router.navigate(['user',this.user.id]);
  }
}
