import { Component, OnInit } from '@angular/core';
import {PostDetailsService} from "../post-details.service";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  private id;
  private singlePost;
  constructor(private postDetails : PostDetailsService) { }

  ngOnInit() {
      this.postDetails.fetchData().subscribe(
          singlePost => {
              this.singlePost = singlePost;
              console.log(this.singlePost);
          }
      );
  }

  set(id){
    this.id = id;

  }
}
