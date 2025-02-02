import { MessageService } from 'primeng/api';
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

  constructor (private formBuilder: FormBuilder, private UserService: UserService, private CookieService: CookieService, private MessageService: MessageService) { }

  onSubmitLoginForm() {
    if (this.loginForm.value && this.loginForm.valid) {
      this.UserService.authUser(this.loginForm.value as AuthUserRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            this.CookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();

            this.MessageService.add({
              severity: 'success',
              summary: 'Login',
              detail: `Bem vindo ${response.name}`,
              life: 3000
            });
          }
        },
        error: (error) => {
          this.MessageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: "Erro ao fazer login",
            life: 3000
          });
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
            this.signUpForm.reset();
            this.loginCard = true;

            this.MessageService.add({
              severity: 'success',
              summary: 'Login',
              detail: `Usuário cadastrado com sucesso!`,
              life: 3000
            });
          }
        },
        error: (error) => {
          this.MessageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: "Erro ao criar usuário",
            life: 3000
          });
        }
      })
      };
    }
}
