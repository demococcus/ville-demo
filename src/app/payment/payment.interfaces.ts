import { FormControl, FormGroup } from "@angular/forms";

export interface PaymentGroup extends FormGroup<{
    name: FormControl<string>;
    cardNumber: FormControl<string>;
    cardType: FormControl<string>;
    expiration: FormControl<string>;
    CVC: FormControl<string>;
}> {}

