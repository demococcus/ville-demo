import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject, of } from 'rxjs';

import { ListComponent } from './list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MainNavbarComponent } from 'src/app/shared/main-navbar/main-navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PermitService } from '../permit.service';
import { DebugElement } from '@angular/core';
import { getMockPermit, getMockPermitsList } from "test-tools/db-data";
import { Permit } from '../models/permit.model';
import { ListItemComponent } from '../list-item/list-item.component';
import { DateMPipe } from 'src/app/shared/pipes/date-m.pipe';
import { StatusPipe } from '../pipes/status.pipe';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';


describe('ListItemComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;
    let el: DebugElement;
    let permitService: any;
    let mockPermitList: Permit[];

    let routes = [
        { path: 'permit', component: ListComponent}
    ]  

  beforeEach(async () => {

    // create a spy object that matches the service and the methods of the service
    const permitServiceSpy = jasmine.createSpyObj(
      'PermitService', 
      ['getPermitsList']
    );


    await TestBed.configureTestingModule({
      declarations: [ 
        ListComponent, MainNavbarComponent, ListItemComponent, 
        DateMPipe, StatusPipe, ConfirmDeleteComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),        
      ],
      providers: [
        {provide: PermitService, useValue: permitServiceSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    mockPermitList = getMockPermitsList();
    permitService = TestBed.inject(PermitService);
   
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPermitsList', () => {

    // define what the service method should return called
    permitService.getPermitsList.and.returnValue(of(mockPermitList));
    
    fixture.detectChanges();
    expect(permitService.getPermitsList).toHaveBeenCalled();

  });

  it('should display a list of items', () => {

    // define what the service method should return called
    permitService.getPermitsList.and.returnValue(of(mockPermitList));
    
    fixture.detectChanges();

    // find and count the list items
    const listItems = el.queryAll(By.css('app-list-item'));    
    expect(listItems.length).toBe(mockPermitList.length);
    

  });

  it('should not display any items', () => {

    // define what the service method should return called
    permitService.getPermitsList.and.returnValue(of([]));
    
    fixture.detectChanges();

    // find and count the list items
    const listItems = el.queryAll(By.css('app-list-item'));    
    expect(listItems.length).toBeFalsy();

  });

});


