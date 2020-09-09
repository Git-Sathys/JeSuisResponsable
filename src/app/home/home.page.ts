import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements  OnInit {

  isAuth: boolean;

  constructor(public router: Router) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        }
    );
  }

  test() {
    console.log('test');
  }
}
