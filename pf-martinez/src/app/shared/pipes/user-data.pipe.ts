import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userData'
})
export class UserDataPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
