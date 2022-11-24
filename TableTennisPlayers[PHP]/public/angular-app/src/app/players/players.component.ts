import { Component, OnInit } from '@angular/core';
import { PlayerDataService } from '../player-data.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Player[] = [];

  constructor(private playerService: PlayerDataService) { }

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(players => {
      this.players = players
    })
  }

}

export class Player {
  #_id!: string;
  #name!: string;
  #username!: string;
  #password!: string;
  #country!: string;
  #achievments!: Achievments[];
  constructor() {}

  get _id() {return this.#_id;}
  set _id(_id: string) { this.#_id= _id;}

  get name() {return this.#name;}
  set name(name: string) { this.#name= name;}

  get username() {return this.#username;}
  set username(username: string) { this.#username= username;}

  get password() {return this.#password;}
  set password(password: string) { this.#password= password;}

  get country() {return this.#country;}
  set country(country: string) { this.#country= country;}

  get achievments() {return this.#achievments;}
  set achievments(achievments: Achievments[]) { this.#achievments= achievments;}
}

export class Achievments {
  #_id!: string;
  #contest!: string;
  #medal!: string;
  constructor() {}

  get _id() {return this.#_id;}
  set _id(_id: string) { this.#_id= _id;}

  get contest() {return this.#contest;}
  set contest(contest: string) { this.#contest= contest;}

  get medal() {return this.#medal;}
  set medal(medal: string) { this.#medal= medal;}
}