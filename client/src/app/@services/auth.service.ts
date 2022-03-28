import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, ReplaySubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthModel } from '../@models/auth-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  // ReplaySubject 1 => bring latest from subject
  private currentUserSource = new ReplaySubject<AuthModel.IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient) { }

  loadCurrentUser(token: string): Observable<void | null> {
    if (token === null) {
      this.currentUserSource.closed = true;
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<AuthModel.IUser>(this.baseUrl + 'account', {headers}).pipe(
      map((user: AuthModel.IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      }),
      catchError((error) => throwError(() => new Error(error)))
    );
  }

  login(values: any): Observable<AuthModel.IUser> {
    return this.http.post<AuthModel.IUser>(this.baseUrl + 'account/login', values).pipe(
      map((user: AuthModel.IUser) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
        return user;
      }),
      catchError((error) => throwError(() => new Error(error)))
    );
  }
}
