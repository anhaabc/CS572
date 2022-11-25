import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AchievmentsService } from '../achievments.service';
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
  contest!: string;
  medal!: string;
  updateEnabled: boolean = false;
  env = environment;
  
  constructor(private playerService: PlayerDataService, private authService: AuthenticationService, private achievmentService: AchievmentsService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn) 
      return;

    this.playerService.getPlayer(this.authService.loggedInPlayerId).subscribe({
      next: (player) => {
        this.player = player;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onAddAchievment(): void {
    if (!this.authService.isLoggedIn) 
      return;

    this.achievmentService.addAchievment(this.authService.loggedInPlayerId, {
      contest: this.contest,
      medal: this.medal
    }).subscribe({
      next: (achievments) => {
        this.player.achievments = achievments;
        this.contest = "";
        this.medal = "";
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onAchievmentDelete(achievmentId: string): void {
    if (!this.authService.isLoggedIn) 
      return;
    
    this.achievmentService.deleteAchievment(this.authService.loggedInPlayerId, achievmentId)
      .subscribe({
        next: (achievments) => {
          this.player.achievments = achievments;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  onDelete(): void {
    this.playerService.deletePlayer(this.authService.loggedInPlayerId)
    .subscribe({
      next: (deletedPlayer) => {
        localStorage.removeItem(environment.token);
        this.router.navigate([environment.nav_home]);
      },
      error: (err) => {
        console.log(err);
      }
    })
      
  }

  onUpdateEnable(): void {
    this.updateEnabled = !this.updateEnabled;
  }

  onUpdateProfile(): void {
    this.playerService.updatePlayer(this.authService.loggedInPlayerId, {
      name: this.player.name,
      country: this.player.country
    }).subscribe({
      next: (player) => {
        this.player = player;
        this.onUpdateEnable();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
