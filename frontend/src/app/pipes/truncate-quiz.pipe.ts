import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateQuiz',
  standalone: true
})
export class TruncateQuizPipe implements PipeTransform {

  transform(value: string, length: number): string {
    if (value.length <= length) {
      return value;
    } else {
      return value.substring(0, length) + '...';
    }
  }

}
