import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-panel',
  templateUrl: './student-panel.component.html',
  styleUrls: ['./student-panel.component.css']
})
export class StudentPanelComponent implements OnInit {

  constructor(private loginService:LoginService, private route: Router) { }

  ngOnInit() {
  }

  logout(){
    this.loginService.logout(localStorage.getItem('token')).subscribe(
      (res) => {
        console.log(res);
        this.route.navigate(['']);
      }
    )
  }
}
