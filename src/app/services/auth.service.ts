import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    currentUser: any;
    public currentUid: any;

  constructor(
      public afAuth: AngularFireAuth,
      private db: AngularFirestore
  ) {
      this.currentUser = this.afAuth.authState.pipe(
          switchMap(user => {
              if (user) {
                  this.currentUid = user.uid;
                  return this.db.doc('users/${user.uid}').valueChanges();
              } else {
                  return of(null);
              }
          })
      );
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
        firebase.auth().signOut();
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
