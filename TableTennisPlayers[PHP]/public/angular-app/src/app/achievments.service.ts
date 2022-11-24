import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Achievments, Player } from './players/players.component';

@Injectable({
  providedIn: 'root'
})
export class AchievmentsService {

  playersApiUrl:string = "http://localhost:3000/api/players/";
  achievment:string = "/achievments/"
  constructor(private http: HttpClient) { }

  public getAchievments(playerId: string): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersApiUrl + playerId + this.achievment);
  }

  public getAchievment(playerId: string, achievmentId: string): Observable<Achievments> {
    const url = this.playersApiUrl + playerId + this.achievment + achievmentId; 
    return this.http.get<Achievments>(url);
  }

  public deleteAchievment(playerId: string, achievmentId: string): Observable<Achievments[]> {
    const headers = { 'authorization': 'Bearer ' + localStorage.getItem("token")}
    const url = this.playersApiUrl + playerId + this.achievment + achievmentId; 
    return this.http.delete<Achievments[]>(url, { headers } );
  }

  public addAchievment(playerId: string, newAchievment: Object): Observable<Achievments[]> {
    const headers = { 'authorization': 'Bearer ' + localStorage.getItem("token")}
    const url = this.playersApiUrl + playerId + this.achievment; 
    return this.http.post<Achievments[]>(url, newAchievment, {headers});
  }

}
