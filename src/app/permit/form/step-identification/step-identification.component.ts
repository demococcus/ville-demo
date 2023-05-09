import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PermitService } from '../../permit.service';
import { FormProvider } from '../form-provider';
import { PermitGroup, CompanyGroup, ContactGroup  } from '../../permit.interfaces';


@Component({
  selector: 'app-step-identification',
  templateUrl: './step-identification.component.html',
  styleUrls: ['./step-identification.component.css']
})
export class StepIdentificationComponent {

  permitForm: PermitGroup;
  companyGroup: CompanyGroup;
  contactGroup: ContactGroup;
  ownershipOptions = [{label: "Oui", value: true}, {label: "Non", value: false}];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private permitService: PermitService,
    private formProvider: FormProvider,
    
  ) {
    this.permitForm = formProvider.getForm() as PermitGroup;
    this.companyGroup = this.permitForm.get('company') as CompanyGroup;
    this.contactGroup = this.permitForm.get('contact') as ContactGroup;
  }

  onNextClicked() {
    this.permitService.saveClicked.next();
    this.router.navigate(['../step-2'], {relativeTo: this.route});
  }


}
