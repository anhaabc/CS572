import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { PlayerDataService } from '../player-data.service';
import { Player } from '../players/players.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  player!: Player;

  constructor(private playerService: PlayerDataService, private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn) 
      return;

    console.log("playerId");
    
    console.log(this.authService.loggedInPlayerId);
    
    this.playerService.getPlayer(this.authService.loggedInPlayerId).subscribe({
      next: (player) => {
        this.player = player;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onDelete(): void {
    this.playerService.deletePlayer(this.authService.loggedInPlayerId)
    .subscribe(deletedPlayer => {
      localStorage.removeItem("token");
      this.router.navigate([""]);
    })
  }

}
