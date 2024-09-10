import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  isloading: boolean = false;

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  errMsg: string = '';
  loginsubscribe!: Subscription;

  loginform: FormGroup = this._FormBuilder.group({
    email: [null, [RxwebValidators.required(), RxwebValidators.email()]],
    password: [
      null,
      [
        RxwebValidators.required(),
        RxwebValidators.pattern({ expression: { pattern: /^.{6,}$/ } }),
      ],
    ],
  });

  onsubmit(): void {
    if (this.loginform.valid) {
      this.isloading = true;
      this.errMsg = '';
      this.loginsubscribe = this._AuthService
        .setloginform(this.loginform.value)
        .subscribe({
          next: (res) => {
            if (res.message == 'success') {
              localStorage.setItem('userToken', res.token);
              this._Router.navigate(['/home']);
              this.isloading = false;
            }
          },
          error: (err) => {
            this.errMsg = err.error.message;
            this.isloading = false;
          },
        });
    } else {
      this.loginform.markAllAsTouched();
    }
  }

  navigateToRegister(): void {
    this._Router.navigate(['/register']);
  }

  navigateToFogotPassword(): void {
    this._Router.navigate(['/forgotPassword']);
  }

  ngOnDestroy(): void {
    this.loginsubscribe?.unsubscribe();
  }
}
