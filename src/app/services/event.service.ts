import { HttpClient, HttpErrorResponse } from '@angular/common/http'

import { Observable, catchError, forkJoin, map, of, throwError } from 'rxjs'
import { TeacherService } from './teacher.service'

import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventUrl = 'assets/data/event.json'
  private eventDetailUrl = 'assets/data/event-detail.json'
  private eventContentUrl = 'assets/data/event-content.json'
  private backendUrl = 'http://localhost:5000/api'
  private apiUrl = 'http://localhost:5000/api/events'

  constructor(
    private http: HttpClient,
    private teacherService: TeacherService,
  ) {}

  addEvent(event: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, event)
  }

  getEvents(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

  getEventById(id: number): Observable<any> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(map((e) => e.find((e) => e._id === id)))
  }

  // update and delete event

  updateEvent(event_id: string, event: any): Observable<any> {
    console.log('evnt', event_id, 'pd', event)

    return this.http
      .put<any>(`${this.apiUrl}/${event_id}`, event)
      .pipe(catchError(this.handleError))
  }

  deleteEvent(event_id: any): Observable<any> {
    console.log('evntid', typeof event_id)

    return this.http
      .delete<any>(`${this.apiUrl}/${event_id}`)
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
