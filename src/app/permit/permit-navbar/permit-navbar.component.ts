/// <reference types="node" />
import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { PermitService } from '../permit.service';



@Component({
  selector: 'app-permit-navbar',
  templateUrl: './permit-navbar.component.html',
  styleUrls: ['./permit-navbar.component.css']
})
export class PermitNavbarComponent {  

  @Input() editMode: boolean; 
  @Input() sinceLastSaved: number;

  constructor(
    private router: Router,
    private permitService: PermitService,
  ) {}

  onExitClicked() {
    if (this.editMode) this.permitService.saveClicked.next();
    this.router.navigate(['/permit']);
  }
}
