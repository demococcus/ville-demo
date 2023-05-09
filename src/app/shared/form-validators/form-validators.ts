import { FormControl } from "@angular/forms"

export class FormValidators {
    
    static fixedLength(requiredLength: number) {
        return (formControl: FormControl) => {
            
            if (formControl.value == null || formControl.value  == "") {return null};

            const actualLength = formControl.value.length;
            if (formControl.value.length == requiredLength) {return null}
            else return {
                fixedLength: { requiredLength, actualLength }
            }
        }       

    }
    
}
