import { FormControl, FormGroup } from "@angular/forms";
import { Geometry } from 'geojson'

export interface CompanyGroup extends FormGroup<{
    companyName: FormControl<string>;
    isPrivateCompany: FormControl<boolean & null>;
    certificateNumber: FormControl<string>;
}> {}

export interface ContactGroup extends FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    phone: FormControl<string>;
    phoneExt: FormControl<string>;
    email: FormControl<string>;
}> {}

export interface DurationGroup extends FormGroup<{
    periodStart: FormControl<string>;
    periodEnd: FormControl<string>;
}> {}

export interface DeclarationGroup extends FormGroup<{
    acceptA: FormControl<boolean & null>;
    acceptB: FormControl<boolean & null>;
    acceptC: FormControl<boolean & null>;
}> {}


export interface PaymentGroup extends FormGroup<{
    name: FormControl<string>;
    cardNumber: FormControl<string>;
    cardType: FormControl<string>;
    expiration: FormControl<string>;
    CVC: FormControl<string>;
}> {}

export interface GeometryGroup extends FormGroup<{
    geom: FormControl<Geometry | any>;
    mapZoom: FormControl<number>;
    centroid: FormControl<[number, number]>;
    insideElements: FormControl<number>;
}> {}


export interface PermitGroup extends FormGroup<{
    permitId: FormControl<number>;  
    status: FormControl<number>;

    dateCreated: FormControl<Date>;
    dateModified: FormControl<Date >;
    dateSubmitted: FormControl<Date >;
    
    company: CompanyGroup;
    contact: ContactGroup;
    duration: DurationGroup;
    geometry: GeometryGroup;
    declaration: DeclarationGroup;
}> {}

