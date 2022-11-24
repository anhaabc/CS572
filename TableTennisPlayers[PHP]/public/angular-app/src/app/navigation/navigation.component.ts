import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private _router: Router) { }


  ngOnInit(): void {
  }

  onHome(): void {
    this._router.navigate(['']);
  }

  onPlayers(): void {
    this._router.navigate(['players']);
  }

  onRegister(): void {
    this._router.navigate(['register']);
  }

  onLogin(): void {
    this._router.navigate(['login']);
  }

  onProfile(): void {
    this._router.navigate(['profile']);
  }

}
