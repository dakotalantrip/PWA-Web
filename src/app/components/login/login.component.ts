import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../../services/auth-api.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

declare const google: any; // 👈 tell TypeScript about the global `google` object

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private authApiService: AuthApiService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.renderGoogleSignInButton();
  }

  renderGoogleSignInButton() {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: this.handleCredentialResponse.bind(this),
      });
      google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        { theme: "outline", size: "large" }  // customization options
      );
    }
  }

  handleCredentialResponse(response: any) {
    console.log('Credential response:', response);
    this.exchangeIdToken(response.credential);
  }

  exchangeIdToken(idToken: string) {
    this.authApiService.exchangeGoogleToken(idToken)
      .subscribe({
        next: (data) => {
          console.log('exchange successful', data);
          this.authService.login(data.jwt); // Store the JWT in local storage
          console.log('Login successful!');
          this.router.navigate(['/dashboard'])
            .then(success => console.log("Navigated to dashboard", success))
            .catch(error => console.error("Navigation error", error));
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
  }
}
