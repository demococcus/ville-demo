import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PermitService } from '../../permit.service';
import { FormProvider } from '../form-provider';
import { PermitGroup } from '../../permit.interfaces';

@Component({
  selector: 'app-step-documents',
  templateUrl: './step-documents.component.html',
  styleUrls: ['./step-documents.component.css']
})
export class StepDocumentsComponent {

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
    this.router.navigate(['../step-2'], {relativeTo: this.route});
  }
  
  onNextClicked() {
    this.permitService.saveClicked.next();
    this.router.navigate(['../step-4'], {relativeTo: this.route});
  }


}
