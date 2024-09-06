import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private backendUrl = 'http://localhost:5000/api'
  private apiUrl = `${this.backendUrl}/teachers`

  constructor(private http: HttpClient) {}

  addTeacher(teacher: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, teacher)
  }

  getBackendTeachers(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

  getBackendTeacherById(id: string): Observable<any> {
    return this.http
      .get<any>(this.apiUrl)
      .pipe(
        map((teachers) =>
          teachers.find((teacher: { _id: string }) => teacher._id === id),
        ),
      )
  }

  updateTeacher(id: string, teacher: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, teacher)
  }

  deleteTeacher(id: string): Observable<any> {
    console.log('Deleting teacher with id:', typeof id)
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }
}
