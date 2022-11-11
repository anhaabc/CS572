import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl("default name"),
      username: new FormControl("default username"),
      password: new FormControl("default p"),
      repassword: new FormControl("default p2")
    });
  }

  onSubmit(): void {
    console.log("submit clicked");
    console.log(this.registrationForm.value);
    console.log(this.registrationForm.value.name);
    console.log(this.registrationForm.value.username);
    console.log(this.registrationForm.value.password);
    console.log(this.registrationForm.value.repassword);
    
  }

}
