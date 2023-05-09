import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateM'
})
export class DateMPipe implements PipeTransform {

  transform(dateM: string, ...args: unknown[]): unknown {
    if (dateM == null || dateM == "") {return dateM};

    if (dateM.length == 8) {
      const dateMFormatted = 
        dateM.substring(0,4) +
        '-' +
        dateM.substring(4,6) +
        '-' +
        dateM.substring(6,8);

      return dateMFormatted;
    }

    const dateMFormatted = 
      dateM.substring(0,4) +
      '-' +
      dateM.substring(5,7) +
      '-' +
      dateM.substring(8,10);

    return dateMFormatted;
  }

}
