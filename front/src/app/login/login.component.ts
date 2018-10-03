import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private type = "password";
  private obj: any;
  role: number = null;
  access_token: any;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
   
  }
  
  LoginForm = new FormGroup({
    emailOrUserID: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,  Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    // remember: new FormControl('')
  })

  onSubmit() {
   console.log(this.LoginForm.value);
   var i = 1;
   if(i == 1){        
     this.loginService.login(this.LoginForm.value).subscribe(
       (res1) => {
         this.access_token = res1.json().access_token;
         console.log(this.access_token);
         i = 0;
         if(i == 0){
           this.loginService.storeToken(res1.json().access_token);
           this.loginService.me(res1.json().access_token).subscribe(
             (res2) => {
               console.log(res2.json().role_id);
               if(res2.json().role == 1){
                 this.router.navigate(['/admin']);
               }
               else{
                 this.router.navigate(['/student']);
               }
             }
           );
         }   
       },
       (err) => {
         console.log(err);
       }
     ); 
   }
  }

  register() {
    this.router.navigate(['/register'])
  }

  forgotPassword() {
    console.log("No component yet");
  }

  show() {
    this.type = "text";
  }

  hide() {
    this.type = "password";
  }
}
