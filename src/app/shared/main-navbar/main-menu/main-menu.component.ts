import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {

  @Output() menuLinkClicked = new EventEmitter();

  onMenuLinkClicked() {
    this.menuLinkClicked.emit();
  }
}
