import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Token } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  #isLoggedIn: boolean = false;
  #loggedInPlayerId!: string;
  #isTokenExpired!: boolean;
  helper: JwtHelperService = new JwtHelperService();

  constructor() { }

  get isLoggedIn() {
    return localStorage.getItem(environment.token) ? true : false;
  }

  get loggedInPlayerId(): string {
    if (this.isLoggedIn) {
      let decodeToken: Token = this.helper.decodeToken(localStorage.getItem(environment.token)?.toString())
      return decodeToken.playerId;
    }
    return "";
  }

  get isTokenExpired() {
    return this.helper.isTokenExpired(localStorage.getItem(environment.token)?.toString());
  }

}
