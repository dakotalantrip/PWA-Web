import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderTaskListComponent } from './reminder-task-list.component';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

describe('ReminderTaskListComponent', () => {
  let component: ReminderTaskListComponent;
  let fixture: ComponentFixture<ReminderTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReminderTaskListComponent],
      providers: [{ provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(ReminderTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
