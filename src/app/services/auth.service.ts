import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { User } from '../interfaces/user.model';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    user: User;
    public currentUid: any;
    public isAuth = false;

  constructor(
      public afAuth: AngularFireAuth,
      private db: AngularFirestore,
      private router: Router,
      private userService: UserService) {
      this.checkLocalStorage();
      
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isAuth = true;
        } else {
            this.isAuth = false;
        }
      });
  }
    
    /*
    * If localStoge is empty, we call getDataFromFirebase
    * method set user data from firebase on localStorage
    */
    checkLocalStorage() {
        if (!localStorage.getItem('user')) {
            this.getDataFromFirebase();
        } else {
            console.log('localStorage ready!');
        }
    }

    /*
    * Call data from firebase and set data on local storage
    */
    getDataFromFirebase() {
        this.afAuth.authState.subscribe(auth => {
        if (auth) {
            console.log('Authenticated');
            this.user = auth; // save data firebase on user
            this.userService.setUserLoggedIn(this.user); // set user data from firebase on local storage
        } else {
            console.log('Not authenticated');
        }
        });
    }

    // Sign in with Facebook
    FacebookAuth() {
        return this.AuthLogin(new auth.FacebookAuthProvider());
    }

    // Auth logic to run auth providers
    AuthLogin(provider) {
        return this.afAuth.signInWithPopup(provider)
            .then((result) => {
            console.log('You have been successfully logged in!');
            }).catch((error) => {
            console.log(error);
            });
    }

    signOutUser() {
        this.userService.clearLocalStorage();
        firebase.auth().signOut()
            .then(() => {
                console.log('You have been successfully logged out!');
            });
    }

    createNewUser(email: string, password: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().createUserWithEmailAndPassword(email, password).then(
                    () => {
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    signInUser(email: string, password: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().signInWithEmailAndPassword(email, password).then(
                    () => {
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }
}
