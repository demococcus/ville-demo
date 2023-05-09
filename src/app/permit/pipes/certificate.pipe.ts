import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'certificate'
})
export class CertificatePipe implements PipeTransform {

  transform(certificate: string, ...args: unknown[]): unknown {

    if (certificate == null || certificate == "") {return certificate};

    const certificateFormatted = 
    certificate.substring(0,2) +
      '-' +
      certificate.substring(2,11) 

    return certificateFormatted;
  }

}
