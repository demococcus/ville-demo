import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PermitRoutingModule } from './permit-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReferenceCardComponent } from './form/reference-card/reference-card.component';
import { StepDocumentsComponent } from './form/step-documents/step-documents.component';
import { StepDurationComponent } from './form/step-duration/step-duration.component';
import { StepIdentificationComponent } from './form/step-identification/step-identification.component';
import { StepLocationComponent } from './form/step-location/step-location.component';
import { StepDeclarationComponent } from './form/step-declaration/step-declaration.component';
import { MapComponent } from './form/map/map.component';
import { ListComponent } from './list/list.component';
import { PermitNavbarComponent } from './permit-navbar/permit-navbar.component';
import { StatusPipe } from './pipes/status.pipe';
import { CertificatePipe } from './pipes/certificate.pipe';
import { ViewComponent } from './form/view/view.component';
import { LastSavedPipe } from './pipes/last-saved.pipe';
import { DatePeriodPickerComponent } from '../shared/form-inputs/date-period-picker/date-period-picker.component';
import { FormComponent } from './form/form.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { ListItemComponent } from './list-item/list-item.component';



@NgModule({
  declarations: [
    ReferenceCardComponent,
    StepDocumentsComponent,
    StepDurationComponent,
    StepIdentificationComponent,
    StepLocationComponent,
    StepDeclarationComponent,
    MapComponent,
    ListComponent,
    PermitNavbarComponent,
    StatusPipe,
    CertificatePipe,
    ViewComponent,
    LastSavedPipe,
    FormComponent,
    ErrorMsgComponent,
    ListItemComponent,    

  ],
  imports: [
    CommonModule,
    PermitRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DatePeriodPickerComponent,   
  ]
})
export class PermitModule { }
