import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { PlayerDataService } from '../player-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  loginFailed: boolean = false;
  loginFailedMsg: string = "Login failed";

  constructor(private playerService: PlayerDataService, public authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.playerService
      .login({
        username: this.username,
        password: this.password
      })
      .subscribe({
        next: (response) => {
          if (response.success) {
            localStorage.setItem("token", response.token);
            this.router.navigate([""]);
          } else {
            this.loginFailed = true;
          }
        },
        error: (err) => {
            this.loginFailed = true;
        }

      })
  }
}

export class LoginResponse {
  success!: boolean;
  token!: string;
}

export class Token {
  playerId!: string;
  exp!: number;
  iat!: number;
}