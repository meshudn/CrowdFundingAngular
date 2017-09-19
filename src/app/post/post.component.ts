import { Component, OnInit } from '@angular/core';
import {PostListService} from "../post-list.service";
import {PostDetailsComponent} from "../post-details/post-details.component";
import {PostDetailsService} from "../post-details.service";

declare let jQuery:any;
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  providers: [PostDetailsComponent],
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private postList: PostListService, private postDetailsService : PostDetailsService) {


      jQuery(".category_carousel").owlCarousel(
          {
              rtl:true,
              loop:true,
              nav:true,
              navText: ['<i class="fa fa-chevron-right"></i>','<i class="fa fa-chevron-left"></i>'],
              responsive:{
                  0:{
                      items:3
                  },
                  600:{
                      items:5
                  },
                  1000:{
                      items:8
                  }
              }
          }
      );
  }
   postItems;
  postId;
  postLimit=6;postOffset=0;

  ngOnInit() {
     this.postList.fetchData(this.postLimit,this.postOffset).subscribe(
         postItems => {
           this.postItems = postItems;
         }
     );

  }



    onClickAdd() {

      // view more campaign button
        this.postLimit += 6;
        this.postList.fetchData(this.postLimit,this.postOffset).subscribe(
            postItems => {
                this.postItems = postItems;
            }
        );
    }

    passingDetails(id){
      this.postDetailsService.postId = id;
      this.postId = id;
      //this.postDetails.set(id);
    }

    search(x){
        this.postDetailsService.getPostByCat(x,this.postLimit,this.postOffset).subscribe(
            postItems => {
                this.postItems = postItems;
            }
        );
    }
}
