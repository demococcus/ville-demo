import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent {
  
  @Input() control: FormControl;
  @Input() label: string;
  @Input() optionsList: {label: string, value: string}[];


  showValid()  {
    const {dirty, touched, errors, pristine } = this.control;
    return dirty && !errors
  }

  showErrors() {
    const {dirty, touched, errors } = this.control;
    return dirty && touched && errors
  }

}
