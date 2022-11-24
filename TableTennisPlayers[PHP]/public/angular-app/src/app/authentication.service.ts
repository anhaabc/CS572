import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
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
    return localStorage.getItem("token") ? true : false;
  }

  get loggedInPlayerId(): string {
    
    if (this.isLoggedIn) {
      let decodeToken: Token = this.helper.decodeToken(localStorage.getItem("token")?.toString())
      return decodeToken.playerId;
    }
    return "x";
  }

}
