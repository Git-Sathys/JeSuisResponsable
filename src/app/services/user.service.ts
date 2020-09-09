import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private users: Observable<User[]>;

  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private db: AngularFirestore) {
    this.usersCollection = db.collection('users');

    this.users = this.usersCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );
  }

  getUsers() {
    return this.users;
  }

  addUser(user: User) {
    return this.usersCollection.add(user);
  }

  // Set data on localStorage
  setUserLoggedIn(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    console.log('saved on localStorage');
  }

  // get data on localStorage
  getUserLoggedIn() {
    if (localStorage.getItem('user')) {
      JSON.parse(localStorage.getItem('user'));
    } else {
      console.log('localStorage empty');
    }
  }
  // Optional: clear localStorage
  clearLocalStorage() {
    localStorage.clear();
  }
}
