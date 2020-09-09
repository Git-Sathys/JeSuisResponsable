import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  isAuth: boolean;

  constructor(public db: AngularFirestore,
              public authService: AuthService) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true;
          } else {
            this.isAuth = false;
          }
    
    });
  }
}
