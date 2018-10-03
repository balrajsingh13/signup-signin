import { Component, OnInit } from '@angular/core';
import { AdminService } from  '../admin.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private adminservice:AdminService, private loginService:LoginService, private route:Router) { }
  data : any[];
  ngOnInit() {
    this.adminservice.viewRecords(localStorage.getItem('token')).subscribe(
      (res) => {
        var record =res.json();
        this.data=record.data;
       }
    )
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
