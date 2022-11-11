import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    HomeComponent,
    GamesComponent,
    GameComponent,
    RegisterComponent,
    LoginComponent,
    ErrorpageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "games",
        component: GamesComponent
      },
      {
        path: "game/:gameId",
        component: GameComponent
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "**",
        component: ErrorpageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
