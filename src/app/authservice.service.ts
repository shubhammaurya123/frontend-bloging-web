import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseApi = 'http://localhost:4500';
  private authTokenKey = 'token';
  private userNameKey = 'userName';
  private userEmailKey = 'userEmail';
  private userAgeKey = 'userAge';
  private userProfileKey = 'userProfile';
  private isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  // Check if token exists in local storage
  private hasToken(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  // Expose authentication status as an observable
  get isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  // Login API Call
  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseApi}/api/auth/login`, { email, password })
      .pipe(
        tap((response) => {
          if (response.token) {
            this.saveAuthData(
              response.token,
              response.name,
              response.email,
              response.age,
              response.profileImage
            );
            this.router.navigate(['/dashboard/blog']); // Redirect after login
          }
        })
      );
  }

  // Signup API Call
  signup(data: {
    name: string;
    email: string;
    password: string;
    age: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseApi}/api/auth/register`, data).pipe(
      tap((response) => {
        if (response.token) {
          this.saveAuthData(
            response.token,
            response.name,
            response.email,
            response.age,
            response.profileImage
          );
          this.router.navigate(['/dashboard/blog']); // Redirect after signup
        }
      })
    );
  }

  // Save token & user details and update auth state
  private saveAuthData(
    token: string,
    name: string,
    email: string,
    age: string,
    profileImage: string
  ): void {
    localStorage.setItem(this.authTokenKey, token);
    localStorage.setItem(this.userNameKey, name);
    localStorage.setItem(this.userEmailKey, email);
    localStorage.setItem(this.userAgeKey, age);
    localStorage.setItem(
      this.userProfileKey,
      profileImage || 'assets/default-profile.png'
    );
    this.isAuthenticated.next(true);
  }

  // Get stored user name
  getUserName(): string {
    return localStorage.getItem(this.userNameKey) || 'Guest';
  }

  // Get stored user email
  getUserEmail(): string {
    return localStorage.getItem(this.userEmailKey) || 'N/A';
  }

  // Get stored user age
  getUserAge(): string {
    return localStorage.getItem(this.userAgeKey) || 'N/A';
  }

  // Get stored profile image
  getUserProfileImage(): string {
    return (
      localStorage.getItem(this.userProfileKey) || 'assets/default-profile.png'
    );
  }

  // Logout user
  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.userNameKey);
    localStorage.removeItem(this.userEmailKey);
    localStorage.removeItem(this.userAgeKey);
    localStorage.removeItem(this.userProfileKey);
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']); // Redirect to login after logout
  }
}
