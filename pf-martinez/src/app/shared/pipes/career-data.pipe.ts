import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'careerData'
})
export class CareerDataPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
