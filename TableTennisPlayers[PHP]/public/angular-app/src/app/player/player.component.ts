import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerDataService } from '../player-data.service';
import { Player } from '../players/players.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  player: Player = new Player();

  constructor(private route: ActivatedRoute, private playerService: PlayerDataService, private router: Router) { }

  ngOnInit(): void {
      const playerId = this.route.snapshot.params['playerId'];
      this.playerService.getPlayer(playerId).subscribe(player => {
        this.player = player;
        console.log(player);
        
      });
  }

  onDelete(): void {
    const playerId = this.route.snapshot.params['playerId'];

    console.log("delete clicked", playerId);
    this.playerService.deletePlayer(playerId).subscribe(player => {
      console.log("deleted game: ", player);
      
      this.router.navigate(["players"])
    });
  }

}
