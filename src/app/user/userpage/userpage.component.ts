import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../user.service";
import { Router } from "@angular/router";
import {PostDetailsService} from "../../post-details.service";

declare let jQuery:any;

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  createPostForm; form; router;loginRole;

   userName;userId;uImage;userFullName;userEmail;

    constructor(private postDetailsService : PostDetailsService,private fb: FormBuilder, private userService : UserService,public route : Router) {
        this.createPostForm = fb.group({
            'title': '',
            'description': '',
            'target_amount': '',
            'tag': '',
            'address': '',
            'websites': '',
            'image': '',
        });

        this.form = fb.group({
            'file1': '',
        });
        this.router = route;
        this.loginUserID = sessionStorage.getItem("user_id");
        this.userName = sessionStorage.getItem("username");
        this.userFullName = sessionStorage.getItem("fullName");
        this.userEmail = sessionStorage.getItem("email");
        this.loginRole = sessionStorage.getItem("role");

        if(this.loginUserID == null){
            this.router.navigate(['/login']);



        }
        this.getPost();


        if(this.loginRole == '2'){
            this.getReportPost();
            this.getBanPost();
        }


    }

  ngOnInit() {
  }

  loginUserID; createMsg;
    createPost(x){

        let now = new Date();
        let cmtCreated = now.toISOString();
        this.userService.addPost(x.title,x.description,x.target_amount,x.tag,x.address,x.websites,this.image,cmtCreated,this.loginUserID).subscribe();

        this.createMsg = "Successfully created.";
    }



    image:File; /* property of File type */
    fileChange(files: any){
        console.log(files);
        this.image = files[0];
    }


     singlePost; banPost;

    getReportPost() {
        this.userService.getReportPost().subscribe(
            singlePost => {
                if(singlePost != null)
                   this.singlePost = singlePost;
                //console.log(this.singlePost[0].image);

                console.log(this.singlePost);
            }
        );

    }

    getBanPost() {
        this.userService.getBanPost().subscribe(
            banPost => {
                if(banPost != null)
                   this.banPost = banPost;
                //console.log(this.singlePost[0].image);

                console.log(this.banPost);
            }
        );

    }

    userPost;
    getPost() {
        this.userService.getPostForUser(this.loginUserID).subscribe(
            userPost => {
                if(userPost != null)
                    this.userPost = userPost;
                //console.log(this.singlePost[0].image);

                console.log(this.loginUserID);
                console.log("sfsdf"+this.userPost);
            }
        );

    }


    passingDetails(id){
        this.postDetailsService.postId = id;
        //this.postDetails.set(id);
    }


    banned(x,event){
       this.userService.banned(x).subscribe();
       event.remove();
    }
    activated(x,event){
        this.userService.activate(x).subscribe();
        event.remove();
    }


    deletePost(x,event){
        this.userService.deletePost(x).subscribe();
        event.remove();
    }


    userHelper(x){

        jQuery("#menu1").removeClass("in active");
        jQuery("#menu5").removeClass("in active");
        jQuery("#menu4").removeClass("in active");
        jQuery("#menu7").removeClass("in active");
        jQuery("#menu6").removeClass("in active");
        jQuery("#basic").removeClass("in active");
        jQuery("#payment").removeClass("in active");
        jQuery("#settings").removeClass("in active");

        jQuery("#"+x).addClass("in active");
    }

    userHelper2(x){
        jQuery("#basic").removeClass("in active");
        jQuery("#payment").removeClass("in active");
        jQuery("#settings").removeClass("in active");

        jQuery("#"+x).addClass("in active");
    }
}
