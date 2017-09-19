import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    router;

    loginUserID;
    constructor( public route : Router) {
        this.router = route;

        this.loginUserID = sessionStorage.getItem("user_id");
    }
  ngOnInit() {
  }

    logOut(){
        console.log("logout click");
    }

}
