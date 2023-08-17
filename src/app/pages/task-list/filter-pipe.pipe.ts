import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }

    const currentDate = new Date();

    return items.filter(item => {
      const selectedDate = new Date(item.selectedDate);

      if (filter === 'Today') {
        return selectedDate.toDateString() === currentDate.toDateString();
      }

      if (filter === 'Tomorrow') {
        const tomorrowDate = new Date();
        tomorrowDate.setDate(currentDate.getDate() + 1);
        return selectedDate.toDateString() === tomorrowDate.toDateString();
      }

      return false;
    });
  }

}
