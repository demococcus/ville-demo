import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {

    const statusCodes = {
      1: 'À compléter',
      2: 'Soumise',
      3: 'Approuvée',
      4: 'Rejetée'
    };

    return statusCodes[value]


  }

}
