import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../services/user.service';
import { NavController, LoadingController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

  user: User = {
    email: '',
    name: '',
    username: '',
    gender: '',
    age: null,
  };

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private loading: LoadingController,
              private userService: UserService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const password = this.signUpForm.get('password').value;
    const email = this.signUpForm.get('email').value;
    this.user.email = this.signUpForm.get('email').value;
    this.user.name = this.signUpForm.get('name').value;
    this.user.username = this.signUpForm.get('username').value;
    this.user.gender = this.signUpForm.get('gender').value;
    this.user.age = this.signUpForm.get('age').value;

    this.authService.createNewUser(email, password).then(() => {
          this.userService.addUser(this.user);
          this.router.navigate(['/home']);
        },
        (error) => {
          this.errorMessage = error;
        }
    );
  }
}
