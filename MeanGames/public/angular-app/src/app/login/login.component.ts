import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  @ViewChild("loginForm")
  loginForm!: NgForm;

  constructor() {
  }

  ngOnInit(): void {
    console.log("ngOnInit");

    setTimeout(() => {
      console.log("OnInit setTimeout");
      console.log(this.loginForm.value);
      this.loginForm.controls['username'].setValue("Default Name");
      this.loginForm.controls['password'].setValue("Default password");
    })
  }

  onLogin():void {
    console.log(this.loginForm.value);
    console.log(this.loginForm.value.username);
    console.log(this.loginForm.value.password);
  }

}
