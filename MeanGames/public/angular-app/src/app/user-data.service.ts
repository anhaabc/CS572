import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './games/games.component';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  baseUrl:string = "http://localhost:3000/api";
  
  constructor(private http: HttpClient) { }

  public addUser(newGame: Object): Observable<Game> {
    return this.http.post<Game>(this.baseUrl + '/users/', newGame);
  }

  public getUsers(): Observable<Game> {
    return this.http.get<Game>(this.baseUrl + '/users');
  }
}
