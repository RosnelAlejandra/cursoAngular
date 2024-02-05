import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseData'
})
export class CourseDataPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
