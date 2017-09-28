import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'makeUserImage'
})
export class MakeUserImagePipe implements PipeTransform {

  transform(value: string, args?: string): string {
      let userlogo="";
      if(value != null && value != ""){
          let nameArray = value.split(/(\s+)/);
          if(nameArray[2] != null){
              userlogo = nameArray[0][0]+""+nameArray[2][0];
          }else{
              userlogo = nameArray[0][0]+""+nameArray[0][1];
          }
      }

    return userlogo;
  }

}
