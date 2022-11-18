import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  title!:string;
  year!:number;
  price!:number;
  rate!:number;

  // @ViewChild("createFrom")
  // createFrom!:NgForm;

  constructor(private gameService: GamesDataService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.year = 1000;
    })
  }

  onSubmit(): void {
    console.log(this.title);
    console.log(this.year);
    console.log(this.price);
    console.log(this.rate);
    
    this.gameService.createGame({
      title: this.title,
      year: this.year,
      price: this.price,
      rate: this.rate
    }).subscribe(newGame => {
      console.log("returned", newGame);
      if (newGame._id)
        this.router.navigate(["game/" + newGame._id]);
    });

  }

}
