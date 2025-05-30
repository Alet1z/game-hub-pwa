import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthToken } from '../interfaces/interfaces';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  isLoggedIn = signal(this.hasToken());

  constructor() {}

  login(credentials: { email: string, password: string }): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${environment.authURL}`, credentials).pipe(
      tap(response => {
        this.saveToken(response.access_token);
        this.isLoggedIn.set(true);
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  logout(): void {
    this.clearToken();
    this.isLoggedIn.set(false);
  }

  private hasToken(): boolean {
    const token = this.getToken();
    return !!token && token.length > 0;
  }
}

