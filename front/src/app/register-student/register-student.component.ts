import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { RegisterService } from '../register.service';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {

  private status = false;
  private type = "password";
  err: string = ''; 

  constructor(private registerService: RegisterService) {
  }
  RegistrationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]+')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    userID: new FormControl('', [Validators.required])
  })

  onSubmit() {
    this.registerService.registerStudent(this.RegistrationForm.value).subscribe(
      (res) => {
        alert("You are registered now... Go back and login");
        console.log("POST Request is successful ", res);
      },
      (error) => {
        alert(error._body);
        console.log("Error", error._body);
      }
    );
  }
  ngOnInit() {

  }

  onKey(event: any) {
    if (event.target.value === this.RegistrationForm.value.Password) {
      this.status = true;
    }
    else {
      this.status = false
    }
  }

  show() {
    this.type = "text"
  }
  hide() {
    this.type = "password"
  }
}



