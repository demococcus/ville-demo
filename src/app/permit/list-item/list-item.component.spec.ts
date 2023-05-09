import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { ListItemComponent } from './list-item.component';
import { DateMPipe } from 'src/app/shared/pipes/date-m.pipe';
import { StatusPipe } from '../pipes/status.pipe';
import { DebugElement } from '@angular/core';
import { Permit } from '../models/permit.model';
import { getMockPermit, getMockPermitsList } from "test-tools/db-data";
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  let el: DebugElement;
  let mockPermit: Permit;
  let mockPermitsList: Permit[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ListItemComponent, DateMPipe, StatusPipe, 
        ConfirmDeleteComponent
      ],
      imports: [
        HttpClientTestingModule,
        
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;

    mockPermit = getMockPermit();
    mockPermitsList = getMockPermitsList();
    

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display  read-only permit', () => {

    component.permit = mockPermitsList[0];
    fixture.detectChanges();

    const viewBtn = el.query(By.css('.btn-success'));
    expect(viewBtn).toBeTruthy();

    const editBtn = el.query(By.css('.btn-info'));
    expect(editBtn).toBeFalsy();

    const deleteBtn = el.query(By.css('.btn-info'));
    expect(deleteBtn).toBeFalsy();

  });

  it('should display editable permit', () => {
    component.permit = mockPermitsList[2];
    fixture.detectChanges();

    const viewBtn = el.query(By.css('.btn-success'));
    expect(viewBtn).toBeFalsy();

    const editBtn = el.query(By.css('.btn-info'));
    expect(editBtn).toBeTruthy();

    const deleteBtn = el.query(By.css('.btn-info'));
    expect(deleteBtn).toBeTruthy();
  });

  it('should display the details - id, date, status', () => {
    pending;
  });


});
