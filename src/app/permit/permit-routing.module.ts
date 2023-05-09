import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { StepDeclarationComponent } from './form/step-declaration/step-declaration.component';
import { StepDocumentsComponent } from './form/step-documents/step-documents.component';
import { StepDurationComponent } from './form/step-duration/step-duration.component';
import { StepIdentificationComponent } from './form/step-identification/step-identification.component';
import { StepLocationComponent } from './form/step-location/step-location.component';
import { ViewComponent } from './form/view/view.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'form', component: FormComponent,
    children: [
      // {path: '', component: ListComponent, pathMatch: 'full'},
      { path: '', redirectTo: 'step-1', pathMatch: 'full' }, 
      { path: 'step-1', component: StepIdentificationComponent },
      { path: 'step-2', component: StepDurationComponent },
      { path: 'step-3', component: StepDocumentsComponent },
      { path: 'step-4', component: StepLocationComponent },
      { path: 'step-5', component: StepDeclarationComponent },
      { path: 'view', component: ViewComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermitRoutingModule { }
