import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderItemListComponent } from './reminder-item-list.component';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

describe('ReminderItemListComponent', () => {
  let component: ReminderItemListComponent;
  let fixture: ComponentFixture<ReminderItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReminderItemListComponent],
      providers: [{ provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(ReminderItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
