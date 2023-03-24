import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

 
  transform(date: any): string {
    return moment(date).fromNow();
  }


}
