import { Component, OnInit } from '@angular/core';
import { PlayerDataService } from '../player-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  constructor(private playerService: PlayerDataService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.playerService.login({
      username: this.username,
      password: this.password
    }).subscribe(response => {
      console.log("token", response);
      localStorage.setItem("token", response.token);
    })
  }
}

export class LoginResponse {
  success!: boolean;
  token!: string;
}
