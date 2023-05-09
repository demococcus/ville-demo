import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {

  @Input() control: FormControl;
  @Input() label: string;
  @Input() option: string;


  showValid()  {
    const {dirty, touched, errors, pristine } = this.control;
    return dirty && !errors
  }

  showErrors() {
    const {dirty, touched, errors } = this.control;
    return dirty && touched && errors

  }

}
