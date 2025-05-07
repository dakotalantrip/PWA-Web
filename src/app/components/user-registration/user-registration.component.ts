import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../../services/auth-api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration',
  imports: [ReactiveFormsModule, MatDividerModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss',
})
export class UserRegistrationComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authApiService: AuthApiService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
  ) {
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', { nonNullable: true }),
      name: new FormControl('', {nonNullable: true}),
      password: new FormControl('', { nonNullable: true }),
      confirmPassword: new FormControl('', { nonNullable: true }),
    });
  }

  ngOnInit(): void {
  }

  public get passwordControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  public get confirmPasswordControl(): FormControl {
    return this.formGroup.get('confirmPassword') as FormControl;
  }

  public get emailControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  public get nameControl(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      const { email, password, confirmPassword, name } = this.formGroup.value;
      this.authApiService.register(email, password, confirmPassword, name).subscribe({
        next: (data: any) => {
          this._snackBar.open("User registration successful!", 'Close');
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.error('Registration failed', err);
        },
      });
    }
  }

  public backToLogin(): void {
    this.router.navigate(['/login']);
  }
}
