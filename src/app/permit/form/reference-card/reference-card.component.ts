import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reference-card',
  templateUrl: './reference-card.component.html',
  styleUrls: ['./reference-card.component.css']
})
export class ReferenceCardComponent {

  @Input() title: string;

}
