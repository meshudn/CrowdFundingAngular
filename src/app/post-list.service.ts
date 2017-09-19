import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class PostListService {
  constructor(private  http: Http) {}

  fetchData(limit,offset){
      let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });
      let options = new RequestOptions({
          headers: headers
      });

      let body = 'limit=' + limit+'&&offset='+offset;

      return this.http.post("https://meshudebnath.com/project/angular/api/getPostByLimit.php", body, options).map(
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
