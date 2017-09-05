import { Component, OnInit } from '@angular/core';
import {PostListService} from "../post-list.service";
import {PostDetailsComponent} from "../post-details/post-details.component";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  providers: [PostDetailsComponent],
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private postList: PostListService, private postDetails : PostDetailsComponent) { }
   postItems;
  ngOnInit() {
     this.postList.fetchData().subscribe(
         postItems => {
           this.postItems = postItems;
             console.log(this.postItems);
         }
     );

  }



    onClickAdd() {
      // view more campaign button

       //this.postItems.push(this.postitem);
    }

    passingDetails(id){
      this.postDetails.set(id);
    }
}
