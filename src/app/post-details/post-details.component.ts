import {Component, OnInit} from '@angular/core';
import {PostDetailsService} from "../post-details.service";
import {FormGroup, FormBuilder, FormControl} from "@angular/forms";
import { UserService } from "../user.service";
import {Observable} from 'rxjs/Rx';
declare let jQuery:any;
import { Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
    /*
     * class variables 
    */
    router;
    private id;
    public singlePost;
    public updatePost;
    public commentPost;
    public paymentPost;
    public userList;
    updateLastTime;
    updateCount;

    userlogo;

    //login user
    loginUsername;
    loginUserImage;
    loginUserID;

    image;
    title;
    description;
    total_amount;
    target_amount;
    created_at;
    user_id;
    tag;
    PostAddress;

    
    username;
    fullName;
    uEmail;
    uImage;
    uActive;
    uRole;
 
   /*
    * variables for time diff calculation..
    */
    
    diff;
    comment_time;
    now;
    cTime;
    diffDays;
    diffHrs;
    diffMins;
    updateLastTimeMsg;
    updateLimit = 3;
    updateOffset = 0;
    paymentLimit = 3;
    paymentOffset = 0;

    /*
    * variables initialization for comment
    */
    topPayUser;
    topPayAmount;
    topPayUserImage;
    topPayTime;
    topPayUserImageShow;
    mostPayUser;
    mostPayAmount;
    mostPayUserImage;
    mostPayTime;
    total_people = 0;

    form;
    text;
    timer;

    commentPostLength;

    constructor(private location: Location,  public route : Router,private postDetails: PostDetailsService, private fb: FormBuilder, private userService : UserService) {
        window.scrollTo(0,0);

        if (this.postDetails.postId != null) {
            this.set(this.postDetails.postId);
        }

       // getting session variable...
      
        this.loginUserImage = sessionStorage.getItem("uImage");
        this.loginUsername = sessionStorage.getItem("fullName");
        this.loginUserID = sessionStorage.getItem("user_id");

        /*
         Form init..
        */
        this.form = fb.group({
            'text': ''
        });
        this.donateForm = fb.group({
            'donateAmount': ''
        });

        this.loginForm = fb.group({
            'username': '',
            'password': '',
            'remember': '',
        });

        this.router = route;

    }
    cancle(){
        this.location.back();
    }
    ngOnInit() {

    }

    ngOnDestroy() {
      
    }

    leaveComment() {
        this.router.navigate(['/login']);
    }

    postComment(comment) {
        this.text = comment.text;
        //console.log(this.text);
        let now = new Date();
        let cmtCreated = now.toISOString();

        this.postDetails.addComment(this.id, this.loginUserID, this.text, this.loginUserImage, this.loginUsername, cmtCreated).subscribe();
    }

    set (id) {
        this.id = id;
        this.getPost();

        // this.getPayment();
        //this.getUpdate();

    }
  
    /*
       Pagination method for Update Section..
     */ 
    moreUpdate() {
        console.log("update offset");
        this.updateOffset += 3;
        this.getUpdate(this.id, this.updateLimit, this.updateOffset);

    }


    /*
       Pagination method for Payment Details.
     */   
    seeMorePayment() {
        console.log("see more clicked");
        this.getPayment(this.id, this.paymentLimit, this.paymentOffset);
    }

    /*
       get all the post for the initial view.
     */ 
    getPost() {
        this.postDetails.fetchData(this.id).subscribe(
            singlePost => {
                this.singlePost = singlePost;
                //console.log(this.singlePost[0].image);
                this.image = this.singlePost[0].image;
                this.title = this.singlePost[0].title;
                this.description = this.singlePost[0].description;
                this.total_amount = this.singlePost[0].total_amount;
                this.target_amount = this.singlePost[0].target_amount;
                this.user_id = this.singlePost[0].user_id;
                this.created_at = this.singlePost[0].created_at;
                this.tag = this.singlePost[0].tag;
                this.PostAddress = this.singlePost[0].address;

                this.getUser(this.user_id);
                this.getUpdate(this.id, this.updateLimit, this.updateOffset);
                this.getComment(this.id);
                this.getPayment(this.id, this.paymentLimit, this.paymentOffset);

                this.timer = Observable.timer(5000, 30000);
                this.timer.subscribe(t => {
                    this.getComment(this.id);
                });

               console.log("ss"+this.created_at+ " " + this.topPayUserImage);
            }
        );


    }

    /*
       get update post items.
     */ 
    getUpdate(id, limit, offset) {
        this.postDetails.fetchUpdate(id, limit, offset).subscribe(
            updatePost => {
                if (this.updatePost != null) {
                    this.updatePost = this.updatePost.concat(updatePost);
                } else {
                    this.updatePost = updatePost;
                }

                //console.log(this.updatePost);
                this.updateCount = this.updatePost.length;
                this.updateLastTime = this.updatePost[this.updateCount - 1].created_at;
                this.updateLastTimeMsg = this.dateCalc(this.updateLastTime);
            }
        );
    }

    /*
       get comment items.
     */ 
    getComment(id) {
        this.postDetails.fetchComment(id).subscribe(
            commentPost => {
                if (this.commentPost != null && this.commentPost.length < this.commentPostLength) {
                    this.commentPost = this.commentPost.concat(commentPost);
                } else {
                    this.commentPost = commentPost;
                    this.commentPostLength = this.commentPost.length;
                    //console.log(this.commentPost);
                }
            }
        );
    }
    /*
       Like event for a single comment.
     */ 
    addLoveToComment(id, love) {
        let x = parseInt(love.innerHTML);
        x = x + 1;
        love.innerHTML = x;
        this.postDetails.addLoveToComment(id).subscribe();
    }

    countPayment;

    /*
      get payment items from server.
     */ 
    getPayment(id, limit, offset) {
        this.postDetails.fetchPayment(id, limit, offset).subscribe(
            paymentPost => {

                if (this.paymentPost != null && this.paymentPost.length > this.total_people) {
                    this.paymentPost = this.paymentPost.concat(paymentPost);

                    this.total_people = this.paymentPost.length;
                } else {
                    this.paymentPost = paymentPost;
                    this.topPayUser = this.paymentPost[0].fullname;
                    this.topPayUserImage = this.paymentPost[0].userImage;
                    this.topPayTime = this.paymentPost[0].created_at;
                    this.topPayAmount = this.paymentPost[0].amount;
                    this.countPayment = this.paymentPost[0].total;

                    this.total_people = this.paymentPost.length;
                }



            }
        );
    }

    /*
       get user details by a id parameter.
     */ 
    getUser(id) {
        this.postDetails.fetchUser(id).subscribe(
            userList => {
                this.userList = userList;
                //console.log(this.userList);
                this.username = this.userList[0].username;
                this.fullName = this.userList[0].fullName;
                this.uImage = this.userList[0].uImage;
                this.uActive = this.userList[0].uActive;
                this.uRole = this.userList[0].uRole;
                this.uEmail = this.userList[0].uEmail;

                let nameArray = this.fullName.split(/(\s+)/);
                if (nameArray[2] != null) {
                    this.userlogo = nameArray[0][0] + "" + nameArray[2][0];
                } else {
                    this.userlogo = nameArray[0][0];
                }

            }
        );
    }

    /*
       Time calcualtion for a comment.
     */ 
    dateCalc(comment_time) {
        // this.comment_time = "2017-09-14T03:24:00";
        this.comment_time = comment_time;
        this.now = new Date();
        this.cTime = new Date(this.comment_time);
        this.diff = this.now - this.cTime;

        this.diffDays = Math.round(this.diff / 86400000); // days
        this.diffHrs = Math.round((this.diff % 86400000) / 3600000); // hours
        this.diffMins = Math.round(((this.diff % 86400000) % 3600000) / 60000); // minutes


        let str;

        if (this.diffDays > 30) {
            //console.log(this.diffDays +" days ago");
            let month = this.diffDays / 31;
            str = month + " months ago";
        } else if (this.diffDays > 0 && this.diffDays < 31) {
            //console.log(this.diffDays +" days ago");
            str = this.diffDays + " days ago";
        } else if (this.diffHrs >= 1) {
            //console.log(this.diffHrs + " Hours ago");
            str = this.diffHrs + " hours ago";
        } else if (this.diffMins == 0) {
            //console.log("just now");
            str = "just now";
        } else if (this.diffMins < 60 && this.diffMins >= 1) {
            //console.log(this.diffMins + " minutes ago");
            str = this.diffMins + " minutes ago";
        }
        return str;
    }

    donateForm;
    donateAmount;


     /*
      Donate method. It takes an amount and a DOM element to view the result in the DOM.
     */ 
    donateNow(x,body) {
        this.donateAmount = x.donateAmount;
        let now = new Date();
        let cmtCreated = now.toISOString();

        let result = parseInt(this.total_amount) + parseInt(this.donateAmount);
        body.innerHTML = result.toString();

        this.postDetails.addDonate(this.id,this.loginUserID,this.loginUsername,this.loginUserImage,this.donateAmount,cmtCreated).subscribe();

        jQuery("#donateModal").modal("hide");
    }



    /*
    * login area
    * */


    login(x){

        this.checkUser(x.username,x.password);
        jQuery("#loginModal").modal("hide");
    }

    loginForm;
    loginUserList; err;
    loginUserId;
    checkUser(username,password) {
        this.userService.fetchUser(username,password).subscribe(
            loginUserList => {
                this.loginUserList = loginUserList;
                console.log("username"+this.loginUserList[0].success);
                if ( this.loginUserList[0].success == "ok" && this.loginUserList[0].active == "1") {

                    sessionStorage.setItem("login","1");
                    sessionStorage.setItem("username",this.loginUserList[0].username);
                    sessionStorage.setItem("user_id",this.loginUserList[0].id);
                    sessionStorage.setItem("fullName",this.loginUserList[0].fullName);
                    sessionStorage.setItem("uImage",this.loginUserList[0].uImage);
                    sessionStorage.setItem("role",this.loginUserList[0].role);
                    sessionStorage.setItem("email",this.loginUserList[0].email);

                    this.loginUserImage = sessionStorage.getItem("uImage");
                    this.loginUsername = sessionStorage.getItem("fullName");
                    this.loginUserID = sessionStorage.getItem("user_id");

                    alert("Welcome to crowdFunding.");
                } else {
                    this.err = "Sorry something went wrong. Please try again.";
                }
            }
        );
    }

}
