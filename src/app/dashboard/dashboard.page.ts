import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.model';


@Component({
  selector: 'app-home',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage implements  OnInit {
  user: User;
  isAuth: boolean;

  constructor(public db: AngularFirestore,
              public authService: AuthService,
              private router: Router
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onSignOut() {
    this.authService.signOutUser();
    this.router.navigate(['home']);
  }

  test() {
    console.log('test');
  }
}
