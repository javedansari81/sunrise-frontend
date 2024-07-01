import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

// user.interface.ts
export interface User {
  id?: number // Optional if generated on backend
  firstName: string
  lastName: string
  mobile: string
  email: string
  password: string
  userType: string
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //private apiUrl = 'assets/data/user.json';
  private apiUrl = 'http://localhost:3000/users'

  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    //user.id = 11;
    user.userType = user.email === 'admin@gmail.com' ? 'admin' : 'user'
    // Assume user creation endpoint or file write logic
    return this.http.post<User>(this.apiUrl, user)
  }
}
