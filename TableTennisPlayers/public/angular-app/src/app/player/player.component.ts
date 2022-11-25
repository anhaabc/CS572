import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PlayerDataService } from '../player-data.service';
import { Player } from '../players/players.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  player: Player = new Player();
  env = environment;
  
  constructor(private route: ActivatedRoute, private playerService: PlayerDataService, private router: Router) { }

  ngOnInit(): void {
      const playerId = this.route.snapshot.params[environment.param_playerId];
      this.playerService.getPlayer(playerId).subscribe(player => {
        this.player = player;
      });
  }

  onDelete(): void {
    const playerId = this.route.snapshot.params[environment.param_playerId];
    this.playerService.deletePlayer(playerId).subscribe(player => {
      this.router.navigate([environment.nav_players])
    });
  }

}
