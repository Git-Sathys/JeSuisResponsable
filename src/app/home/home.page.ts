import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements  OnInit {

  isAuth: boolean;

  constructor(public db: AngularFirestore,
              public authService: AuthService
  ) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true;
          } else {
            this.isAuth = false;
          }
        }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

  test() {
    console.log('test');
  }
}
