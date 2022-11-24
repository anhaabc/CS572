import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      console.log("regsitered Player", newPlayer);
      this.router.navigate(["player/" + newPlayer._id]);
    })
  }

}
