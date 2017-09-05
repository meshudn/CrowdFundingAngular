import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
@Injectable()
export class PostListService {
  constructor(private  http: Http) {}

  fetchData(){
      return this.http.get("http://localhost/angular/api/getAllPosts.php").map(
         (response) => {
             return response.json();
         }
     );

  }

  get(){
      return this.postItems;
  }

  add(postItem){
      this.postItems.push(postItem);
  }

  remove(postItem){
      var index = this.postItems.indexOf(postItem);
      if(index >= 0)
          this.postItems.slice(index,1);
  }

  postItems;
}
