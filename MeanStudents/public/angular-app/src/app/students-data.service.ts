import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Students } from './students-list/students-list.component';

@Injectable({
  providedIn: 'root'
})
export class StudentsDataService {
  baseUrl:string = "http://localhost:3000/api/students/"

  constructor(private http: HttpClient) { }

  public getStudents(): Observable<Students[]> {
    return this.http.get<Students[]>(this.baseUrl);
  }
  public getOneStudent(id: string): Observable<Students> {
    return this.http.get<Students>(this.baseUrl + id);
  }
  public deleteOneStudent(id: string): Observable<Students> {
    return this.http.delete<Students>(this.baseUrl + id);
  }
}
