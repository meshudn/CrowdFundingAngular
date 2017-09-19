import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsTime'
})
export class JsTimePipe implements PipeTransform {

    diff;comment_time;now;cTime;diffDays;diffHrs;diffMins;

  transform(value: string, exponent: string): string {

      this.comment_time = value;
      this.now = new Date();
      this.cTime = new Date(this.comment_time);
      this.diff = this.now - this.cTime;

      this.diffDays = Math.round(this.diff / 86400000); // days
      this.diffHrs = Math.round((this.diff % 86400000) / 3600000); // hours
      this.diffMins = Math.round(((this.diff % 86400000) % 3600000) / 60000); // minutes


      let str;

      if (this.diffDays > 30) {
          //console.log(this.diffDays +" days ago");
          let month = this.diffDays / 31;
          str = month +" months ago";
      }else
      if (this.diffDays > 0 && this.diffDays < 31) {
          //console.log(this.diffDays +" days ago");
          str = this.diffDays +" days ago";
      } else if (this.diffHrs >= 1) {
          //console.log(this.diffHrs + " Hours ago");
          str = this.diffHrs +" hours ago";
      } else if (this.diffMins == 0) {
          //console.log("just now");
          str = "just now";
      } else if (this.diffMins < 60 && this.diffMins >= 1) {
          //console.log(this.diffMins + " minutes ago");
          str = this.diffMins +" minutes ago";
      }

    return str;
  }

}
