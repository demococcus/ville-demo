import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(phoneNumber: string, ...args: unknown[]): unknown {

    if (phoneNumber == null || phoneNumber == "") {return phoneNumber};

    const phoneNumberFormatted = 
      '(' +
      phoneNumber.substring(0,3) +
      ') ' +
      phoneNumber.substring(3,6) +
      '-' +
      phoneNumber.substring(6,10)   

    return phoneNumberFormatted;
  }

}
