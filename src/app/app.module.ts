import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { RouterModule,Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { PostListService } from './post-list.service';
import { PostDetailsService} from "./post-details.service";
import { PostComponent } from './post/post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { JsTimePipe } from './js-time.pipe';
import { MakeUserImagePipe } from './make-user-image.pipe';
import { UserpageComponent } from './user/userpage/userpage.component';
import { LoginComponent } from './login/login.component';
import {UserService} from "./user.service";
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './logout/logout.component';
import { SliceArrayPipe } from './slice-array.pipe';

const appRoutes: Routes = [
    {
        path: "details",
        component: PostDetailsComponent
    },
    {
        path: "home",
        component: PostComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "dashboard",
        component: UserpageComponent
    },
    {
        path: "logout",
        component: LogoutComponent
    },
];

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostDetailsComponent,
    JsTimePipe,
    MakeUserImagePipe,
    UserpageComponent,
    LoginComponent,
    HeaderComponent,
    LogoutComponent,
    SliceArrayPipe,
  ],
  imports: [
    BrowserModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(
          appRoutes,
      )
  ],
  providers: [PostListService,PostDetailsService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
