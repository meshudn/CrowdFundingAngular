import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
declare let jQuery:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  router;
  signupForm;
  constructor(private fb: FormBuilder, private userService : UserService, public route : Router) {
      this.loginForm = fb.group({
          'username': '',
          'password': '',
          'remember': '',
      });
      this.signupForm = fb.group({
          'username': '',
          'password': '',
          'fullname': '',
          'email': '',
      });
      this.router = route;
  }

  ngOnInit() {
      jQuery("#tabs-1").show();
      jQuery("#tabs-2").hide();
  }

  login(x){
     this.checkUser(x.username,x.password);
  }

  userList; err;
  checkUser(username,password) {
        this.userService.fetchUser(username,password).subscribe(
            userList => {
               this.userList = userList;
               console.log("username"+this.userList[0].success);
                if ( this.userList[0].success == "ok" && this.userList[0].active == "1") {

                    sessionStorage.setItem("login","1");
                    sessionStorage.setItem("username",this.userList[0].username);
                    sessionStorage.setItem("user_id",this.userList[0].id);
                    sessionStorage.setItem("fullName",this.userList[0].fullName);
                    sessionStorage.setItem("uImage",this.userList[0].uImage);
                    sessionStorage.setItem("role",this.userList[0].role);
                    sessionStorage.setItem("email",this.userList[0].email);

                  this.router.navigate(['/dashboard']);
                } else {
                  this.err = "Sorry something went wrong. Please try again.";
                }
            }
        );
    }

    loginButton(x){
        jQuery("#tabs-1").hide();
        jQuery("#tabs-2").hide();
        jQuery("#"+x).show();
    }

    signup(x){
        this.userService.signUp(x.username,x.password,x.fullname,x.email).subscribe();

        this.loginButton('tabs-1');
    }
}
