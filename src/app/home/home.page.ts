import { Component } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public db: AngularFirestore) {}
  user: any = {
    salut : 'salu'
  };

  test() {
    this.db.collection('users').add(this.user);
  }
}
