import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class PostDetailsService {

    constructor(private  http: Http) {}

    fetchData(id){
        let body = 'id='+id;

        return this.http.post("http://localhost/angular/api/singlePost.php",body).map(
            (response) => {
                return response.json();
            }
        );

    }

    singlePost;
}
