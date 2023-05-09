import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent {
  @Output() confirmed = new EventEmitter<void>();

  constructor() { }

  onContinue() {
    this.confirmed.emit();
  }

}
