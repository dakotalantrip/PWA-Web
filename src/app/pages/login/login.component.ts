import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

import { AuthApiService } from '../../services/auth-api.service';
import { AuthService } from '../../services/auth.service';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { User } from '../../models/authentication/user.model';

declare const google: any; // 👈 tell TypeScript about the global `google` object

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatDividerModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authApiService: AuthApiService,
    private authService: AuthService,
  ) {
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', { nonNullable: true }),
      password: new FormControl('', { nonNullable: true }),
    });
  }

  ngOnInit(): void {
    this.renderGoogleSignInButton();
  }

  public get passwordControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  public get emailControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  renderGoogleSignInButton() {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: this.handleCredentialResponse.bind(this),
      });
      google.accounts.id.renderButton(
        document.getElementById('g_id_signin'),
        { theme: '', size: 'large' }, // customization options
      );
    }
  }

  //#region Events

  handleCredentialResponse(response: any) {
    this.exchangeIdToken(response.credential);
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.value;
      this.authApiService
        .login(email, password)
        .pipe(
          filter((value: any) => value),
          switchMap((value: any) => this.getUser(value)),
        )
        .subscribe({
          error: (err: any) => {
            console.error('Login failed', err);
          },
        });
    }
  }

  //#endregion

  exchangeIdToken(idToken: string) {
    this.authApiService.exchangeGoogleToken(idToken).subscribe({
      next: (data) => {
        this.authService.login(data.jwt); // Store the JWT in local storage
        this.router
          .navigate(['/dashboard'])
          .then((success) => console.log('Navigated to dashboard', success))
          .catch((error) => console.error('Navigation error', error));
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }

  private getUser(data: any): Observable<User> {
    this.authService.login(data.jwt); // Store the JWT in local storage
    return this.authApiService.getUser().pipe(
      tap(() => {
        this.router
          .navigate(['/dashboard'])
          .then((success) => console.log('Navigated to dashboard', success))
          .catch((error) => console.error('Navigation error', error));
      }),
    );
  }

  public onSignUp(): void {
    this.router.navigate(['registration']);
  }
}
