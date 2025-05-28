import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { ReminderTaskListComponent } from './reminder-task-list.component';

describe('ReminderTaskListComponent', () => {
  let component: ReminderTaskListComponent;
  let fixture: ComponentFixture<ReminderTaskListComponent>;

  const bottomSheetRefStub = { dismiss: jasmine.createSpy('dismiss') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReminderTaskListComponent],
      providers: [
        { provide: MatBottomSheetRef, useValue: bottomSheetRefStub },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: [] },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReminderTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
