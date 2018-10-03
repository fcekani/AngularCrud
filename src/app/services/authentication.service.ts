import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let credentials = JSON.parse(localStorage.getItem('credentials'));
    if (!credentials) {
      credentials = {
        UserName: 'test',
        Password: 'test'
      }
    }
    if (credentials) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Basic ' + btoa(credentials.UserName + ':' + credentials.Password)
        }
      });
    }

    return next.handle(request);
  }
}
