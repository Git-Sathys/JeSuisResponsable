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
  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private db: AngularFirestore,
              private authService: AuthService
  ) {
    this.usersCollection = db.collection('users');
  }

  addUser(user: User) {
    return this.usersCollection.add(user);
  }
}
