import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from './login/login.component';
import { Player } from './players/players.component';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {

  playersApiUrl:string = "http://localhost:3000/api/players/";
  loginApiUrl:string = "http://localhost:3000/api/login/";
  constructor(private http: HttpClient) { }

  public getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersApiUrl);
  }

  public getPlayer(id: string): Observable<Player> {
    return this.http.get<Player>(this.playersApiUrl+ id);
  }

  public deletePlayer(id: string): Observable<Player> {
    const headers = { 'authorization': 'Bearer ' + localStorage.getItem("token")}
    return this.http.delete<Player>(this.playersApiUrl + id, { headers } );
  }

  public updatePlayer(id: string, updatedPlayer: Object): Observable<Player> {
    const headers = { 'authorization': 'Bearer ' + localStorage.getItem("token")}
    return this.http.patch<Player>(this.playersApiUrl + id, updatedPlayer, { headers } );
  }

  public registerPlayer(newPlayer: Object): Observable<Player> {
    return this.http.post<Player>(this.playersApiUrl, newPlayer);
  }

  public login(loginInfo: Object): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginApiUrl, loginInfo);
  }

}
