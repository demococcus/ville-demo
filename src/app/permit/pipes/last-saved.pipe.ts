import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastSaved'
})
export class LastSavedPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {

    const minutes = Math.round(value / 60);

    if (value < 1) {return ""}
    else if (value < 20) {return "Sauvegardé il y a quelques instants."}
    else if (value < 60) {return "Sauvegardé il y a moins d'une minute."}
    else if (minutes == 1) {return "Sauvegardé il y a une minute."}
    else if (minutes == 60) {return "Sauvegardé il y a une heure."}
    else if (minutes > 60) {return "Sauvegardé il y a plus d'une heure."}
    else {return "Sauvegardé il y a " + minutes + " minutes"};

  }

}
