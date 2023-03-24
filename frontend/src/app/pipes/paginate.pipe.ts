import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate',
  standalone: true
})
export class PaginatePipe implements PipeTransform {

  transform(items: any[], currentPage: number = 1, pageSize: number = 10): any[] {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
  }

}
