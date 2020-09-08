import { Injectable } from '@angular/core';

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

  constructor() { }
}
