import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PermitService } from '../../permit.service';
import { FormProvider } from '../form-provider';
import { PermitGroup, DeclarationGroup } from '../../permit.interfaces';

@Component({
  selector: 'app-step-declaration',
  templateUrl: './step-declaration.component.html',
  styleUrls: ['./step-declaration.component.css']
})
export class StepDeclarationComponent {


  permitForm: PermitGroup; 
  declarationGroup: DeclarationGroup;
  ownershipOptionsList = ['Oui', 'Non'];


  declarationsList = [
    {label: "Je certifie que...", fieldName: 'acceptA'},
    {label: "J'accepte de...", fieldName: 'acceptB'},
    {label: "Je consens à...", fieldName: 'acceptC'},
  ]


  getFieldValue(fieldName: string) {
    return this.permitForm.get(fieldName).value;
  }
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private permitService: PermitService,
    private formProvider: FormProvider,    
  ) {

    this.permitForm = formProvider.getForm() as PermitGroup;
    this.declarationGroup = this.permitForm.get('declaration') as DeclarationGroup;
  }

  onPrevClicked() {
    this.router.navigate(['../step-4'], {relativeTo: this.route});
  }
  
  onSubmitClicked() {
    this.permitForm.controls.status.setValue(2);
    this.permitService.saveClicked.next();
    this.router.navigate(['/permit']);
  }



}
