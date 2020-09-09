import { Component, OnInit } from '@angular/core';
import {User, UserService} from '../../services/user.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

}
