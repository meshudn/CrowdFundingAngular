import {Component} from '@angular/core';
import {PostListService} from "./post-list.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    private data;

    constructor(private postList: PostListService) {
    }

    ngOnInit() {

        //this.postItem = this.postList.fetchData();

    }

    postItem;


}
