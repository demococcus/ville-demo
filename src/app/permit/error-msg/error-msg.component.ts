import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PermitService } from '../permit.service';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit, OnDestroy {

  errorMsgSub: Subscription;
  errorMessage: string;

  constructor (
    private permitService: PermitService 
    ) {}

  ngOnInit() {

    // subscribe to error messages from the service
    this.errorMsgSub = this.permitService.errorMsg.subscribe({
      next: (message: string) => {this.errorMessage = message}
    });

  }

  ngOnDestroy() {

    if (this.errorMsgSub) this.errorMsgSub.unsubscribe();
  }

  dismissError() {
    this.permitService.errorMsg.next(null);
  }

  
      

}
