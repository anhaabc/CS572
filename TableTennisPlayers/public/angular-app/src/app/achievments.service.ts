import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Achievments, Player } from './players/players.component';

@Injectable({
  providedIn: 'root'
})
export class AchievmentsService {

  playersApiUrl:string = environment.base_url + environment.player_service_url;
  achievment:string = environment.achievment_service_url;

  constructor(private http: HttpClient) { }

  public getAchievments(playerId: string): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersApiUrl + playerId + this.achievment);
  }

  public getAchievment(playerId: string, achievmentId: string): Observable<Achievments> {
    const url = this.playersApiUrl + playerId + this.achievment + achievmentId; 
    return this.http.get<Achievments>(url);
  }

  public deleteAchievment(playerId: string, achievmentId: string): Observable<Achievments[]> {
    const headers = { authorization: environment.token_bearer + localStorage.getItem(environment.token)}
    const url = this.playersApiUrl + playerId + this.achievment + achievmentId; 
    return this.http.delete<Achievments[]>(url, { headers } );
  }

  public addAchievment(playerId: string, newAchievment: Object): Observable<Achievments[]> {
    const headers = { authorization: environment.token_bearer + localStorage.getItem(environment.token)}
    const url = this.playersApiUrl + playerId + this.achievment; 
    return this.http.post<Achievments[]>(url, newAchievment, {headers});
  }

}
