import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

import { Permit } from '../models/permit.model';
import { PermitService } from '../permit.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy{

  permitsList: Permit[] = [];
  showPlaceholder: boolean = false;
  listChangedSub: Subscription;

  constructor(
    private permitService: PermitService,
    private router: Router,
    
  ) {}

  ngOnInit() {

    this.loadList();
    this.permitService.selectedPermitId = null;
    setTimeout(() => {this.showPlaceholder = true}, 500);
    this.listChangedSub = this.permitService.listChanged.subscribe(() => {this.loadList()});
    
  }

  ngOnDestroy () {

    this.listChangedSub.unsubscribe();
  }

  loadList() {

    const getListObserver = {
      next: (value: Permit[]) => {            
        this.permitsList = value;
        this.permitService.errorMsg.next(null);
      },
      error: (err: Error) =>  {
        this.showPlaceholder = false;
        console.log('error', err);
        this.permitService.errorMsg.next("Une erreur s'est produite lors du chargement de la liste.");
      }
    }

    this.permitService.getPermitsList().subscribe(getListObserver);

  }

  onNewPermit() {
    this.permitService.selectedPermitId = null;
    this.router.navigate(['/permit/form/step-1']);
  }

  onEditPermit(permitId: string) {
    this.permitService.selectedPermitId = permitId;
    this.router.navigate(['/permit/form/step-1']);
  }

  onDeletePermit(permitId: string, i: number) {
    
    // start by removing the item from the list
    this.permitsList.splice(i, 1);

    // do the rest
    this.permitService.deletePermit(permitId);    
  }

  onViewPermit(permitId: string) {
    this.permitService.selectedPermitId = permitId;
    this.router.navigate(['/permit/form/view']);
  }


}
