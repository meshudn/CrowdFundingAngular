import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class UserService {

    constructor(private  http: Http) {}

    fetchUser(username,password) {

        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });

        let body = 'username=' + username+'&&password='+password;

        return this.http.post("http://localhost/angular/api/loginCheck.php", body, options).map(
            (response) => {
                return response.json();
            }
        );

    }
    signUp(username,password,fullName,email) {

        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });

        let now = new Date();
        let cmtCreated = now.toISOString();

        let body = 'username=' + username+'&&password='+password+'&&fullName='+fullName+'&&email='+email+'&&created_at='+cmtCreated+'&&role=1'+'&&uImage=im3.jpg';

        return this.http.post("http://localhost/angular/api/addUser.php", body, options).map(
            (response) => {
                return response.json();
            }
        );

    }


    addPost(title,description,target,tag,location,websites,image,time,user_id) {
        /*let _formData = new FormData();
        _formData.append("image", image);*/

        let headers = new Headers(
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        );
        let options = new RequestOptions({
            headers: headers
        });

        let body = 'title=' + title+'&&description='+description+'&&target='+target+'&&tag='+tag+'&&address='+location+'&&websites='+websites+'&&image='+image+'&&created_at='+time+'&&user_id='+user_id;

        return this.http.post("http://localhost/angular/api/createPost.php", body, options).map(
            (response) => {
                return response.json();
            }
        );

    }

    getBanPost() {

        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });

        let body = '';

        return this.http.post("http://localhost/angular/api/singleBanPost.php", body, options).map(
            (response) => {
                return response.json();
            }
        );

    }
    getReportPost() {

        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });

        let body = '';

        return this.http.post("http://localhost/angular/api/singleReportPost.php", body, options).map(
            (response) => {
                return response.json();
            }
        );

    }
    activate(id) {

        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });

        let body = 'id='+id;

        return this.http.post("http://localhost/angular/api/activatePost.php", body, options).map(
            (response) => {
                return response.json();
            }
        );

    }
    banned(id) {

        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });

        let body = 'id='+id;

        return this.http.post("http://localhost/angular/api/bannedPost.php", body, options).map(
            (response) => {
                return response.json();
            }
        );

    }

    getPostForUser(id){
        console.log(id + "dfjskdjf");
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });

        let body = 'id='+id;

        return this.http.post("http://localhost/angular/api/getPostForUser.php", body, options).map(
            (response) => {
                return response.json();
            }
        );
    }

    deletePost(id){
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });

        let body = 'id='+id;
        return this.http.post("http://localhost/angular/api/deletePost.php", body, options).map(
            (response) => {
                return response.json();
            }
        );
    }
}
