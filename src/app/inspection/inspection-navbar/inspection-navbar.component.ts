import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inspection-navbar',
  templateUrl: './inspection-navbar.component.html',
  styleUrls: ['./inspection-navbar.component.css']
})
export class InspectionNavbarComponent  {

  @Input() networkType: number;

  networkName = {1: 'Aqueduc', 2: 'Égout'}

 

}
