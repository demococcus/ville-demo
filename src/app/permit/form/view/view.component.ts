import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormProvider } from '../form-provider';
import { PermitGroup, DeclarationGroup } from '../../permit.interfaces';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {

  
  permitForm: PermitGroup; 
  declarationGroup: DeclarationGroup;
  ownershipOptionsList = ['Oui', 'Non'];


  getFieldValue(fieldName: string) {
    return this.permitForm.get(fieldName).value;
  }
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formProvider: FormProvider,    
  ) {

    this.permitForm = formProvider.getForm() as PermitGroup;
  }

  onBackClicked() {
    this.router.navigate(['/permit']);
  }
  



}
