import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    const modifiedReq = req.clone({
      setHeaders: {
        key: environment.secretKey,
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      }
    });

    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          localStorage.clear(); // logout
        }

        alert(error.error?.message || 'Something went wrong');

        return throwError(() => error);
      })
    );
  }
}