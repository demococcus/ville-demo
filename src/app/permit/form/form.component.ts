/// <reference types="node" />
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PermitGroup, CompanyGroup, ContactGroup, DurationGroup, DeclarationGroup, GeometryGroup } from './../permit.interfaces';
import { FormProvider } from './form-provider';
import { FormValidators } from '../../shared/form-validators/form-validators';
import { environment } from '../../../environments/environment'
import { PermitService } from './../permit.service'
import { Permit } from './../models/permit.model';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [{ provide: FormProvider, useExisting: FormComponent }]
})
export class FormComponent implements OnInit, OnDestroy{
    
  permitFormGroup: PermitGroup;
  permit: Permit;
  
  saveClickedSub: Subscription;
  lastSaved: Date = null;
  sinceLastSaved: number = null;
  timerHandle: NodeJS.Timer;
  
  devMode = environment.devMode;
  
  constructor (
    private fb: FormBuilder, 
    private permitService: PermitService,
    ) {}


  ngOnInit() {

    // create empty permit form and object
    this.permitFormGroup = this.buildPermitFormGroup();
    this.permit = new Permit();

    // get the id of the currently selected permit and populate the form
    const selectedPermitId = this.permitService.selectedPermitId;
    if (selectedPermitId) {this.loadPermit(selectedPermitId)}

    // subscribe to saveClicked form the steps and the navbar
    this.saveClickedSub = this.permitService.saveClicked.subscribe({
      next: () => {this.savePermitForm();}
    });
    
  }

  ngOnDestroy() {
    this.saveClickedSub.unsubscribe();
    clearInterval(this.timerHandle);
    this.lastSaved = null;
  }

  loadPermit(permitId: string) {

    const getPermitObserver = {
      next: (value: Permit) => {      

        this.permit.fromPayload(value);       
        this.permit.toForm(this.permitFormGroup);        
        this.permitService.errorMsg.next(null);
      },  
      error: (err: Error) =>  {
        console.log('error', err);
        this.permitService.errorMsg.next("Une erreur s'est produite lors du chargement de la demande.");
      }
    }
    this.permitService.getPermit(permitId).subscribe(getPermitObserver);
  }
  
  buildPermitFormGroup() {

    const companyGroup: CompanyGroup = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(80)]],
      isPrivateCompany: [null, [Validators.required]],
      certificateNumber: ['', {validators: [FormValidators.fixedLength(10)]}],
    });
  
    const contactGroup: ContactGroup = this.fb.group({
      firstName: ['', [Validators.minLength(2), Validators.maxLength(80)]],
      lastName: ['', [Validators.minLength(2), Validators.maxLength(80)]],
      phone: ['', [FormValidators.fixedLength(10)]],
      phoneExt: ['', [Validators.maxLength(8)]],
      email: ['', [Validators.email, Validators.minLength(4), Validators.maxLength(80)]]
    });
    
    const durationGroup: DurationGroup = this.fb.group({
      periodStart: ['', [Validators.required]],
      periodEnd: ['', [Validators.required]],
    });

    const geometryGroup: GeometryGroup = this.fb.group({
      geom: [null, [Validators.required]],
      mapZoom: [],
      centroid: [],
      insideElements: [],
    });
  
    const declarationGroup: DeclarationGroup = this.fb.group({
      acceptA: [null, [Validators.requiredTrue]],
      acceptB: [null, [Validators.requiredTrue]],
      acceptC: [null, [Validators.requiredTrue]],
    });
  
  
    const permitFormGroup: PermitGroup = this.fb.group({
      permitId: [],
      status: [1, [Validators.required]],
      
      dateCreated: [],
      dateModified: [],
      dateSubmitted: [],
      
      company: companyGroup,
      contact: contactGroup,
      duration: durationGroup,
      geometry: geometryGroup,
      declaration: declarationGroup,
    });


    return permitFormGroup;
  }

  getForm() {
    return this.permitFormGroup;
  }
  
  savePermitForm() {

    // create an object from the values in the form
    const permit = new Permit();
    permit.fromForm(this.permitFormGroup);

    const permitSaveObserver = {
      next: (value: Permit) => {   
        this.permitService.errorMsg.next(null);
        this.permitService.listChanged.next();
         
        // update the current form with the data returned from the API
        permit.fromPayload(value);
        permit.toForm(this.permitFormGroup);
        this.permitService.selectedPermitId = value._id;

        // start the timer for the lastSaved status
        this.lastSaved = new Date();
        this.sinceLastSaved = 1;
        this.timerHandle = setInterval(() => { 
          this.sinceLastSaved = Math.round((new Date().getTime() - this.lastSaved.getTime()) / 1000);
        }, 15000);


      },  
      error: (err: Error) =>  {
        console.log('error', err);
        this.permitService.errorMsg.next("Une erreur s'est produite lors de l'enregistrement de la demande.");
        return false;
      }
    }

    this.permitService.savePermit(permit).subscribe(permitSaveObserver);    
  }

  throwTestError() {
    this.permitService.errorMsg.next('A Test error has occurred!');
  }

}
