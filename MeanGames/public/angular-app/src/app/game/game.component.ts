import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesDataService } from '../games-data.service';
import { Game } from '../games/games.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game!: Game;

  constructor(private route: ActivatedRoute, private gameService: GamesDataService, private router: Router) { }

  ngOnInit(): void {
    const gameId = this.route.snapshot.params['gameId'];
    this.gameService.getGame(gameId).subscribe(game => {
      this.game = game;
    });
  }

  onDelete(): void {
    const gameId = this.route.snapshot.params['gameId'];

    console.log("delete clicked", gameId);
    this.gameService.deleteGame(gameId).subscribe(game => {
      console.log("deleted game: ", game);
      
      // this.game = game;
      this.router.navigate(["games"])
    });
  }

}
