import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private _router: Router, public authService: AuthenticationService) { }

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

  onLogout(): void {
    localStorage.removeItem("token")
    this._router.navigate(['']);
  }

  onProfile(): void {
    this._router.navigate(['profile']);
  }

}
