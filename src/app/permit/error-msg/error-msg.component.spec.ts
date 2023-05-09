import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ErrorMsgComponent } from './error-msg.component';
import { PermitService } from '../permit.service';
import { Subject } from 'rxjs';
import { mockClick } from 'test-tools/test-utils';

describe('ErrorMsgComponent', () => {
  let component: ErrorMsgComponent;
  let fixture: ComponentFixture<ErrorMsgComponent>;
  let el: DebugElement;
  let permitService: PermitService;
  let errorMsgSubject: Subject<string>;

  beforeEach(async () => {

    // create a spy object that matches the service and the methods of the service
    const permitServiceSpy = jasmine.createSpyObj('PermitService', ['someMethod']);

    // add the subjects to the service
    errorMsgSubject = new Subject<string>();
    permitServiceSpy.errorMsg = errorMsgSubject;
    

    await TestBed.configureTestingModule({
      declarations: [ ErrorMsgComponent ],
      imports: [
        // PermitModule
        // RouterTestingModule .withRoutes([]),
        // HttpClientTestingModule
      ],
      providers: [
        {provide: PermitService, useValue: permitServiceSpy}
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorMsgComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    permitService = TestBed.inject(PermitService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should start without errorMessage', () => { 
    
    // examine the property of the component
    expect(component.errorMessage).toBeFalsy();
    
    // find the corresponding div in the DOM
    const alertDiv = el.query(By.css(".alert")); 
    expect(alertDiv).withContext('Alert should not be rendered').toBeFalsy();

  });

  it('should display the received error message', () => {   
    
    // the service emits  an error message
    const errorMessage = 'Mock error'
    permitService.errorMsg.next(errorMessage);    
    
    // trigger the change detection
    fixture.detectChanges();

    // examine the property of the component
    expect(component.errorMessage).toBe(errorMessage);
   
    // find the corresponding div in the DOM
    const alertDiv = el.query(By.css(".alert"));    

    expect(alertDiv).withContext('Alert is not rendered').toBeTruthy();
    expect(alertDiv.nativeElement.textContent).withContext('Alert does not show the message').toContain(errorMessage);

  });

  it('should not display an empty error message', () => {   
    
    // the service emits a null error message
    permitService.errorMsg.next(null);    
    
    // trigger the change detection
    fixture.detectChanges();

    // examine the property of the component
    expect(component.errorMessage).toBe(null);
   
    // find the corresponding div in the DOM
    let alertDiv = el.query(By.css(".alert"));    

    expect(alertDiv).withContext('Alert should not be rendered').toBeFalsy;

  });

  it('should hide the message when discarded by the user', () => {   

    // the service emits  an error message
    const errorMessage = 'Mock error'
    permitService.errorMsg.next(errorMessage);    
    
    // trigger the change detection
    fixture.detectChanges();

    // examine the property of the component
    expect(component.errorMessage).toBe(errorMessage);
   
    // find the corresponding div in the DOM
    let alertDiv = el.query(By.css(".alert"));

    expect(alertDiv).withContext('Alert is not rendered').toBeTruthy();
    expect(alertDiv.nativeElement.textContent).withContext('Alert does not show the message').toContain(errorMessage);

    // find the close button
    const closeBtn = el.query(By.css(".btn-close"));
    expect(closeBtn).withContext('Close button not found').toBeTruthy();

    // click the close button
    mockClick(closeBtn);

    // now verify that he message is gone
    fixture.detectChanges();   
    alertDiv = el.query(By.css(".alert"));
    expect(alertDiv).withContext('Alert is sill there').toBeFalsy();    
   
  });


});
