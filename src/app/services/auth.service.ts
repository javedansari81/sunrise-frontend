import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { tap } from 'rxjs/operators'
import { map, catchError } from 'rxjs/operators'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api'

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  setToken(userResponse: any){
    localStorage.setItem('access_token', userResponse.access_token);
    localStorage.setItem('currentUser', JSON.stringify(userResponse.user)); // Store user details
  }

  isLoggedIn(): boolean {
    return !!this.getToken()
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
  }
}
