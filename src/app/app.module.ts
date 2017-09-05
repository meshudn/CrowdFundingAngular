import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostListService } from './post-list.service';
import { PostDetailsService} from "./post-details.service";
import { PostComponent } from './post/post.component';
import { PostDetailsComponent } from './post-details/post-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostDetailsComponent
  ],
  imports: [
    BrowserModule,
      HttpModule,
      RouterModule.forRoot([
          {
            path: "details",
            component: PostDetailsComponent
          },
          {
            path: "home",
            component: PostComponent
          }
      ])
  ],
  providers: [PostListService,PostDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
