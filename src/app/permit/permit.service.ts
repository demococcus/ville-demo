import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment'
import { Permit } from './models/permit.model';

const storeKey = 'permitId';

@Injectable({
  providedIn: 'root'
})
export class PermitService { 
  
  private _selectedPermitId: string = null;
  errorMsg = new Subject<string>();
  saveClicked = new Subject<void>();
  listChanged = new Subject<void>();
  

  constructor(
    private http: HttpClient
  ) {}

  get selectedPermitId(): string {

    if (this._selectedPermitId == null && this.storageGet() !== null) {
      this._selectedPermitId = this.storageGet();
    }
    return this._selectedPermitId;

  }

  set selectedPermitId(permitId: string) {
    this._selectedPermitId = permitId;
    this. storageSet(permitId);
  }

  savePermit(permit: Partial<Permit>) {    

    const _id = permit._id;

    // remove the auto values
    const propertiesToRemove = ['_id', 'centroid', 'insideElements', 'dateCreated', 'dateModified', 'dateSubmitted'];
    for (const prop of propertiesToRemove) {
      delete permit[prop];
    }

     if (_id !== null) {
      return this.http.patch<Permit>(`${environment.urlAPI}permits/${_id}`, permit);
    } else {
      return this.http.post<Permit>(`${environment.urlAPI}permits`, permit);
    }
  }

  getPermit(permitId: string) {       
    return this.http.get<Permit>(`${environment.urlAPI}permits/${permitId}`)
  }

  getPermitsList() {  
    return this.http.get<Permit[]>(`${environment.urlAPI}permits`);
  }

  deletePermit(permitId: string) {
    const permitDeleteObserver = {
      next: (value: {message: string}) => {  
        this.errorMsg.next(null);  
      },  
      error: (err: Error) =>  {
        console.log('error', err);
        this.errorMsg.next("Une erreur s'est produite lors de la suppression de la demande.");
      }
    }

    const deleteSub = this.http.delete<{message: string}>(`${environment.urlAPI}permits/${permitId}`);
    deleteSub.subscribe(permitDeleteObserver);
  }

  storageSet(permitId: string) {
    window.sessionStorage.removeItem(storeKey);
    if (permitId !== undefined && permitId !== null) {
      window.sessionStorage.setItem(storeKey, permitId);
    }
  }

  storageGet() {
    return window.sessionStorage.getItem(storeKey);
  }

  
}
