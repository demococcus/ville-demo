import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repair'
})
export class RepairPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {

    const statusCodes = {
      0: 'En service',
      1: 'En réparation',
      
    };

    return statusCodes[value]


  }

}
