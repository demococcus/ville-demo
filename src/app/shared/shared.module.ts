import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputComponent } from './form-inputs/input/input.component';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { RadioComponent } from './form-inputs/radio/radio.component';
import { CheckboxComponent } from './form-inputs/checkbox/checkbox.component';
import { SelectComponent } from './form-inputs/select/select.component';
import { BooleanToTextPipe } from './pipes/boolean-to-text.pipe';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { PhonePipe } from './pipes/phone.pipe';
import { DateMPipe } from './pipes/date-m.pipe';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { MainMenuComponent } from './main-navbar/main-menu/main-menu.component';


@NgModule({
  declarations: [
    InputComponent,
    RadioComponent,
    CheckboxComponent,
    SelectComponent,
    BooleanToTextPipe,
    MainNavbarComponent,
    PhonePipe,
    DateMPipe,
    ConfirmDeleteComponent,
    MainMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  providers: [provideNgxMask()],
  exports: [
    MainNavbarComponent,
    InputComponent, 
    RadioComponent, 
    CheckboxComponent, 
    SelectComponent, 
    BooleanToTextPipe,
    PhonePipe,
    DateMPipe,
    ConfirmDeleteComponent,
  ]
})
export class SharedModule { }
