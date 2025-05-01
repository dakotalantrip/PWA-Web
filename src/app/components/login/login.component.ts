import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../../services/auth-api.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
      username: new FormControl('', { nonNullable: true }),
      password: new FormControl('', { nonNullable: true }),
    });
  }

  ngOnInit(): void {
    this.renderGoogleSignInButton();
  }

  public get passwordControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  public get usernameControl(): FormControl {
    return this.formGroup.get('username') as FormControl;
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
    console.log('Credential response:', response);
    this.exchangeIdToken(response.credential);
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      const { username, password } = this.formGroup.value;
      this.authApiService.login(username, password).subscribe({
        next: (data: any) => {
          console.log('Login successful', data);
          this.authService.login(data.jwt); // Store the JWT in local storage
          this.router
            .navigate(['/dashboard'])
            .then((success) => console.log('Navigated to dashboard', success))
            .catch((error) => console.error('Navigation error', error));
        },
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
        console.log('exchange successful', data);
        this.authService.login(data.jwt); // Store the JWT in local storage
        console.log('Login successful!');
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
}
