
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';


@Injectable()
export class MainInterceptor implements HttpInterceptor {
  constructor(private userService: UserService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cookieKey = 'user';
    const token = this.userService.getToken(cookieKey);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(catchError(err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 403 || err.status === 404 || err.status === 422) {
          this.router.navigate(['']);
        }
        return throwError(err);
      }
    }));
  }
}
