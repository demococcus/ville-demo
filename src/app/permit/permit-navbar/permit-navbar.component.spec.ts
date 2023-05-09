import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { PermitNavbarComponent } from './permit-navbar.component';
import { PermitService } from '../permit.service';
import { Subject } from 'rxjs';
import { mockClick } from 'test-tools/test-utils';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LastSavedPipe } from '../pipes/last-saved.pipe';
import { ListComponent } from '../list/list.component';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

describe('ErrorMsgComponent', () => {
  let component: PermitNavbarComponent;
  let fixture: ComponentFixture<PermitNavbarComponent>;
  let el: DebugElement;
  let permitService: any;
  let router: Router;
  let location: Location;

  let routes = [
    { path: 'permit', component: ListComponent}
]  


  beforeEach(async () => {
    
    // create a spy object that matches the service and the methods of the service
    const permitServiceSpy = jasmine.createSpyObj('PermitService', ['getPermitsList']);
   
    await TestBed.configureTestingModule({
      declarations: [ PermitNavbarComponent, LastSavedPipe, ListComponent ],
      imports: [
        HttpClientTestingModule,    
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        {provide: PermitService, useValue: permitServiceSpy}
      ]

    })
    .compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location); // - gives an error :()
    fixture = TestBed.createComponent(PermitNavbarComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    permitService = TestBed.inject(PermitService);

  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should switch to edit mode', () => {

    component.editMode = true;
    fixture.detectChanges();        
    const exitBtn = el.query(By.css(".btn"))

    expect(exitBtn.nativeElement.textContent).toContain('Sauvegarder et quitter');

  });

  it('should switch to view mode', () => {

    component.editMode = false;
    fixture.detectChanges();        
    
    const exitBtn = el.query(By.css(".btn"))
    expect(exitBtn.nativeElement.textContent).toContain('Retour à la liste');

  });

  it('should not display time status', () => {

    component.sinceLastSaved = null;
    fixture.detectChanges();           
    const exitBtn = el.query(By.css(".time-status"));
    expect(exitBtn).toBeFalsy();

  });

  it('should display time status', () => {

    component.sinceLastSaved = 15;
    fixture.detectChanges();           
    const exitBtn = el.query(By.css(".time-status"));    

    expect(exitBtn).toBeTruthy();

  });

  it('should call saveClicked when exiting in editMode', async () => {

    permitService.saveClicked = new Subject<void>();
    let saveClickedSpy = spyOn(permitService.saveClicked, 'next');

    // put the component in edit mode
    component.editMode = true;
    fixture.detectChanges();

    // call the exit method
    component.onExitClicked();
    expect(saveClickedSpy).withContext('saveClicked not called when exiting in edit mode').toHaveBeenCalled();   

  });

  it('should not call saveClicked when exiting in viewMode', async () => {

    permitService.saveClicked = new Subject<void>();
    let saveClickedSpy = spyOn(permitService.saveClicked, 'next');

    // put the component in edit mode
    component.editMode = false;
    fixture.detectChanges();

    // call the exit method
    component.onExitClicked();
    expect(saveClickedSpy).not.toHaveBeenCalled();   

  });

  it('should navigate away', async () => {

    // call the exit method
    component.onExitClicked();

    await fixture.whenStable();

    expect(location.path()).toBe('/permit');

  });

  it('should call onExitClicked() when clicked', async () => {

    // get the button
    const exitBtn = el.query(By.css(".btn "));
    expect(exitBtn).toBeTruthy();

    // start spying the method
    spyOn(component, 'onExitClicked');

    // click the button
    mockClick(exitBtn);
    
    expect(component.onExitClicked).toHaveBeenCalled();

  });


});