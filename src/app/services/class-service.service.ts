import { Injectable } from '@angular/core'

import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, forkJoin, map, throwError } from 'rxjs'

import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ClassServiceService {
  private classUrl = 'assets/data/class.json'
  private classDetailsUrl = 'assets/data/class-detail.json'

  private backendUrl = 'http://localhost:5000/api'
  private apiUrl = 'http://localhost:5000/api/classes'
  class_data: any

  constructor(private http: HttpClient) {}

  getClass(): Observable<any> {
    return this.http.get(this.classUrl)
  }

  getClassDetail(): Observable<any> {
    return this.http.get(this.classDetailsUrl)
  }

  getClassAndClassDetail(): Observable<any[]> {
    const classes$ = this.http.get<any[]>(this.classUrl)
    const classDetails$ = this.http.get<any[]>(this.classDetailsUrl)

    return forkJoin([classes$, classDetails$]).pipe(
      map(([classes, classDetails]) => {
        return classes.map((classElement) => {
          const details = classDetails.find(
            (detail) => detail.classId === classElement.classId,
          )

          return { ...classElement, ...details }
        })
      }),
    )
  }

  getClassById(id: number): Observable<any> {
    return forkJoin([this.getClass(), this.getClassDetail()]).pipe(
      map(([classes, classDetails]) => {
        const cls = classes.find((c: { classId: number }) => c.classId === id)
        const details = classDetails.find((d: any) => d.classId === id)
        return { ...cls, ...details }
      }),
    )
  }
  getClassDetailById(id: number): Observable<any> {
    return this.http
      .get<any[]>(this.classDetailsUrl)
      .pipe(
        map((details) => details.find((detail) => detail.classDetailId === id)),
      )
  }

  addClass(class_data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, class_data)
  }

  findClasses(): Observable<any> {
    return this.http.get(this.apiUrl)
  }
  updateClass(id: string, classData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, classData)
  }

  deleteClass(class_id: any): Observable<any> {
    console.log('csid', typeof class_id)

    return this.http
      .delete<any>(`${this.apiUrl}/${class_id}`)
      .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      console.error('An error occurred:', error.error.message)
    } else {
      // The backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`,
      )
    }
    // Return an observable with a user-facing error message
    return throwError(
      () => new Error('Something went wrong; please try again later.'),
    )
  }
}
