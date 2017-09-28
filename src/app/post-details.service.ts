import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class PostDetailsService {

    postId;

    constructor(private  http: Http) {
    }

    fetchData(id) {

        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });

        let body = 'id=' + id;

        return this.http.post("http://localhost/angular/api/singlePost.php", body, options).map(
            (response) => {
                return response.json();
            }
        );

    }

    fetchUpdate(id, limit, offset) {

        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });

        let body = 'id=' + id + '&&limit=' + limit + '&&offset=' + offset;

        return this.http.post("http://localhost/angular/api/singleUpdate.php", body, options).map(
            (response) => {
                return response.json();
            }
        );

    }

    fetchComment(id) {

        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });

        let body = 'id=' + id;

        return this.http.post("http://localhost/angular/api/singleComment.php", body, options).map(
            (response) => {
                return response.json();
            }
        );

    }


    fetchPayment(id, limit, offset) {

        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });

        let body = 'id=' + id + '&&limit=' + limit + '&&offset=' + offset;

        return this.http.post("http://localhost/angular/api/singlePayment.php", body, options).map(
            (response) => {
                return response.json();
            }
        );

    }

    fetchUser(id) {

        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });

        let body = 'id=' + id;

        return this.http.post("http://localhost/angular/api/findUser.php", body, options).map(
            (response) => {
                return response.json();
            }
        );

    }

    addComment(id, user_id, text, userImage, fullName,created_at) {

        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });

        let body = 'id=' + id + '&&user_id=' + user_id + '&&text=' + text + '&&userImage=' + userImage + '&&fullName=' + fullName + '&&created_at=' + created_at;

        return this.http.post("http://localhost/angular/api/addComment.php", body, options).map(
            (response) => {
                return response.json();
            }
        );

    }

    addLoveToComment(id) {

        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });

        let body = 'id=' + id ;
        return this.http.post("http://localhost/angular/api/addLoveToComment.php", body, options).map(
            (response) => {
                return response.json();
            }
        );

    }

    addDonate(post_id,user_id,fullName,userImage,amount,created_at) {

        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });

        let body = 'post_id=' + post_id + '&&user_id=' + user_id + '&&amount=' + amount + '&&userImage=' + userImage + '&&fullName=' + fullName + '&&created_at=' + created_at;

        return this.http.post("http://localhost/angular/api/addPayment.php", body, options);

    }

    getPostByCat(id,limit,offset) {

        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });

        let body = 'id=' + id+'&&limit=' + limit+'&&offset='+offset;

        return this.http.post("http://localhost/angular/api/getPostByCat.php", body, options).map(
            (response) => {
                return response.json();
            }
        );

    }

    singlePost;
}
