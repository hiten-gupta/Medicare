import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface AuthResponse {
  token: string; email: string; name: string; role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem('medicare_user');
    if (saved) this.currentUserSubject.next(JSON.parse(saved));
  }

  register(data: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(res => {
        localStorage.setItem('medicare_user', JSON.stringify(res));
        localStorage.setItem('medicare_token', res.token);
        this.currentUserSubject.next(res);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('medicare_user');
    localStorage.removeItem('medicare_token');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean { return !!localStorage.getItem('medicare_token'); }
  isAdmin(): boolean { return this.currentUserSubject.value?.role === 'ADMIN'; }
  getCurrentUser(): AuthResponse | null { return this.currentUserSubject.value; }
}