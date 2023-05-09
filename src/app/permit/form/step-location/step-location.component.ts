import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PermitService } from '../../permit.service';
import { FormProvider } from '../form-provider';
import { PermitGroup } from '../../permit.interfaces';

@Component({
  selector: 'app-step-location',
  templateUrl: './step-location.component.html',
  styleUrls: ['./step-location.component.css']
})
export class StepLocationComponent {
  permitForm: PermitGroup; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private permitService: PermitService,
    private formProvider: FormProvider,    
  ) {
    this.permitForm = formProvider.getForm() as PermitGroup;
  }

  onPrevClicked() {
    this.router.navigate(['../step-3'], {relativeTo: this.route});
  }
  
  onNextClicked() {
    this.permitService.saveClicked.next();
    this.router.navigate(['../step-5'], {relativeTo: this.route});
  }

}
