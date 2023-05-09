import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PermitService } from '../../permit.service';
import { FormProvider } from '../form-provider';
import { PermitGroup, DurationGroup } from '../../permit.interfaces';


@Component({
  selector: 'app-step-duration',
  templateUrl: './step-duration.component.html',
  styleUrls: ['./step-duration.component.css'],
})
export class StepDurationComponent {

  permitForm: PermitGroup; 
  formGroup: DurationGroup;
  optionsList = [{label: "Toute l'année", value: true}, {label: "Période spécifique", value: false}];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private permitService: PermitService,
    private formProvider: FormProvider,
    
  ) {
    this.permitForm = formProvider.getForm() as PermitGroup;
    this.formGroup = this.permitForm.get('duration') as DurationGroup;
  }

  onPrevClicked() {
    this.router.navigate(['../step-1'], {relativeTo: this.route});
  }
  
  onNextClicked() {
    this.permitService.saveClicked.next();
    this.router.navigate(['../step-3'], {relativeTo: this.route});
  }


}
