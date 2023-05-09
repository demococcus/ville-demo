import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { FormValidators } from '../shared/form-validators/form-validators';
import { PaymentGroup } from './payment.interfaces';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  // formGroup: PaymentGroup;
  cardTypes = [
    {label: "", value: ""}, 
    {label: "VISA", value: "VISA"}, 
    {label: "MasterCard", value: "MASTERCARD"}
  ]


  formGroup: PaymentGroup = this.fb.group({
    
    name: ['', [Validators.required, Validators.minLength(3)]],
    cardNumber: ['', [Validators.required, FormValidators.fixedLength(16)]],
    cardType: ['', [Validators.required]],
    expiration: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\d{2}$/)]],
    CVC: ['', [Validators.required, FormValidators.fixedLength(3)]],
  });

  
  constructor(
    private fb: FormBuilder, 
    
  ) {}
  


}
