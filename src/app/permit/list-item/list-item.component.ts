import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Permit } from '../models/permit.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {



  @Input() permit: Permit;
  
  @Output() editEvent = new EventEmitter<void>();
  @Output() deleteEvent = new EventEmitter<void>();
  @Output() viewEvent = new EventEmitter<void>();

  onEditClicked() {
    this.editEvent.emit();
  }

  onDeleteClicked() {
    this.deleteEvent.emit();
  }

  onViewClicked() {
    this.viewEvent.emit();
  }

}


