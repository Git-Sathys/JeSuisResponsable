import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface User {
  id?: string;
  email: string;
  name: string;
  username: string;
  gender: string;
  age: number;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private users: Observable<User[]>;

  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private db: AngularFirestore,
              private authService: AuthService
  ) {
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
}
