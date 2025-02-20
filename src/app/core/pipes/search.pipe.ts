import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../interfaces/Iproduct';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(items:any[],text:string): any[] {
    return items.filter((item)=>
      item.title.toLowerCase().includes(text.toLowerCase())
    )
  }

}
