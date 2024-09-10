import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intNum',
  standalone: true
})
export class IntNumPipe implements PipeTransform {

  transform(value: number): number {
    return Math.trunc(value);
  }

}
