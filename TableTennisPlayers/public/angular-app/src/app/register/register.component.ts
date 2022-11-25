import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PlayerDataService } from '../player-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username!: string;
  password!: string;
  name!: string;
  country!: string;

  env = environment;
  constructor(private playerService: PlayerDataService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.playerService.registerPlayer({
      username: this.username,
      password: this.password,
      name: this.name,
      country: this.country
    }).subscribe(newPlayer => {
      this.router.navigate([environment.nav_player + newPlayer._id]);
    })
  }

}
