import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar for displaying error messages

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private _snackBar = inject(MatSnackBar); // Inject MatSnackBar for displaying error messages

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Client error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Server error (${error.status}): ${error.message}`;
        }

        this._snackBar.open(errorMessage, 'Close');
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
