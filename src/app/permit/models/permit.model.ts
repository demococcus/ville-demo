import { Geometry } from "geojson";
import { PermitGroup } from "../permit.interfaces";

const formDict = {
    // payload property : data form control
    _id: 'permitId', 
    status: 'status', 

    geom: 'geometry.geom', 
    mapZoom: 'geometry.mapZoom', 
    centroid: 'geometry.centroid', 
    insideElements: 'geometry.insideElements', 
    
    dateCreated: 'dateCreated',
    dateModified: 'dateModified',
    dateSubmitted: 'dateSubmitted',

    companyName: 'company.companyName',
    isPrivateCompany: 'company.isPrivateCompany',
    certificateNumber: 'company.certificateNumber',

    firstName: 'contact.firstName',
    lastName: 'contact.lastName',
    phone: 'contact.phone',
    email: 'contact.email',

    periodStart: 'duration.periodStart',
    periodEnd: 'duration.periodEnd',

    acceptA: 'declaration.acceptA',
    acceptB: 'declaration.acceptB',
    acceptC: 'declaration.acceptC',
  };


export class Permit {
    public _id?: string;
    public status?: number;

    public geom?: Geometry;
    public mapZoom?: number;
    public centroid?: [number, number];
    public insideElements?: number;

    public dateCreated?: Date;
    public dateModified?: Date;    
    public dateSubmitted?: Date; 
    
    public companyName?: string; 
    public isPrivateCompany?: boolean;
    public certificateNumber?: string;
    
    public firstName?: string;
    public lastName?: string;
    public phone?: string;
    public phoneExt?: string;
    public email?: string;
    
    public periodStart?: Date;
    public periodEnd?: Date;
    
    public acceptA?: boolean;
    public acceptB?: boolean;
    public acceptC?: boolean;
 
    constructor() {
        this.status = 1;
    }

    fromPayload(payload: Permit) {
        for (let payloadField in formDict) {
            this[payloadField] = payload[payloadField];
        }
    }

    fromForm(permitGroup: PermitGroup) {

        for (let payloadField in formDict) {

            const formControlName = formDict[payloadField];
            const formControl = permitGroup.get(formControlName);
            let value = formControl.value;
        
            // transform empty strings to null
            if (value === '') value = null;         
            
            // only send the values that are valid
            if (!formControl.errors) {this[payloadField] = value;}; 
        } 
        
    }


    toForm(formGroup: PermitGroup) {
        for (let payloadField in formDict) {
        const formControlName = formDict[payloadField];
        const payloadValue = this[payloadField];

        formGroup.get(formControlName).setValue(payloadValue);        
        }
    }
}

