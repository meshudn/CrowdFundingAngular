import {Component} from '@angular/core';
import {PostListService} from "./post-list.service";
import { Router } from "@angular/router";
declare let jQuery:any;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    private data;
    router;

    loginUserID;
    constructor(private postList: PostListService, public route : Router) {
        this.router = route;

        this.loginUserID = sessionStorage.getItem("user_id");


        jQuery(".mySlider").owlCarousel(
            {
                center: true,
                items:3,
                autoplay:true,
                autoplayTimeout: 5000,
                autoplayHoverPause:false,
                autoplaySpeed: 2000,
                loop:true,
                responsive:{
                    600:{
                        items:2
                    }
                }
            }
        );

    }

    ngOnInit() {

        //this.postItem = this.postList.fetchData();

    }

    postItem;




}
