import { CookieService } from 'ngx-cookie-service';
import { AuthUserRequest } from './../../../../../API/stock-api/src/models/interfaces/user/AuthUserRequest';
import { UserService } from './../../services/users/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupUserRequest } from 'src/app/models/interfaces/user/signupUserRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  signUpForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor (private formBuilder: FormBuilder, private UserService: UserService, private CookieService: CookieService) { }

  onSubmitLoginForm() {
    if (this.loginForm.value && this.loginForm.valid) {
      this.UserService.authUser(this.loginForm.value as AuthUserRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            alert('Usuario logado com sucesso!');
            this.CookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();
            this.loginCard = true;
          }
        },
        error: (error) => {
          console.log(error)
        }
      })
      };
  }

  onSubmitSignUpForm() {
    if (this.signUpForm.value && this.signUpForm.valid) {
      this.UserService.signUpUser(this.signUpForm.value as SignupUserRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            alert('Usuario registrado com sucesso!');
            this.signUpForm.reset();
            this.loginCard = true;
          }
        },
        error: (error) => {
          console.log(error)
        }
      })
      };
    }
}
