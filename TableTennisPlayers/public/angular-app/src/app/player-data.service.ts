import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from './login/login.component';
import { Player } from './players/players.component';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {

  playersApiUrl:string = environment.base_url + environment.player_service_url;
  loginApiUrl:string = environment.base_url + environment.login_service_url;
  constructor(private http: HttpClient) { }

  public getPlayers(offset: number, count: number): Observable<Player[]> {
    let query = "?" + environment.query_offset + offset;
    query += "&" + environment.query_count + count;
    return this.http.get<Player[]>(this.playersApiUrl + query);
  }

  public getPlayersByName(count: number, name: string): Observable<Player[]> {
    let query = "?" + environment.query_count + count;
    query += "&" + environment.query_name + name;
    return this.http.get<Player[]>(this.playersApiUrl + query);
  }

  public getPlayer(id: string): Observable<Player> {
    return this.http.get<Player>(this.playersApiUrl+ id);
  }

  public deletePlayer(id: string): Observable<Player> {
    const headers = { authorization : environment.token_bearer + localStorage.getItem(environment.token)}
    return this.http.delete<Player>(this.playersApiUrl + id, { headers } );
  }

  public updatePlayer(id: string, updatedPlayer: Object): Observable<Player> {
    const headers = { authorization: environment.token_bearer + localStorage.getItem(environment.token)}
    return this.http.patch<Player>(this.playersApiUrl + id, updatedPlayer, { headers } );
  }

  public registerPlayer(newPlayer: Object): Observable<Player> {
    return this.http.post<Player>(this.playersApiUrl, newPlayer);
  }

  public login(loginInfo: Object): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginApiUrl, loginInfo);
  }

}
