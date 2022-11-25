import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  env = environment;

  constructor(private _router: Router, public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onHome(): void {
    this._router.navigate([environment.nav_home]);
  }

  onPlayers(): void {
    this._router.navigate([environment.nav_players]);
  }

  onRegister(): void {
    this._router.navigate([environment.nav_register]);
  }

  onLogin(): void {
    this._router.navigate([environment.nav_login]);
  }

  onLogout(): void {
    localStorage.removeItem(environment.token)
    this._router.navigate([environment.nav_home]);
  }

  onProfile(): void {
    this._router.navigate([environment.nav_profile]);
  }

}
