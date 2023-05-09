import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
 
  @Input() control: FormControl;
  @Input() label: string;
  @Input() optionsList: {label: string, value: string}[];


  showValid()  {
    const {dirty, touched, errors, pristine } = this.control;
    return dirty && !errors
  }

  showErrors() {
    const {dirty, touched, errors } = this.control;
    // return true
    return dirty && touched && errors
  }
  
}
