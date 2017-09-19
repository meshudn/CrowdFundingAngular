import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
   router;
    constructor( public route : Router) {

        this.router = route;

        sessionStorage.clear();
        console.log("session "+sessionStorage.getItem('user_id'));
        this.router.navigate(['/home']);
    }

  ngOnInit() {

  }

}
