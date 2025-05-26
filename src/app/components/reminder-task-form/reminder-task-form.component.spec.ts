import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderTaskFormComponent } from './reminder-task-form.component';
import { FormBuilder } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

describe('ReminderTaskFormComponent', () => {
  let component: ReminderTaskFormComponent;
  let fixture: ComponentFixture<ReminderTaskFormComponent>;

  const bottomSheetRefStub = { dismiss: jasmine.createSpy('dismiss') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReminderTaskFormComponent],
      providers: [
        { provide: MatBottomSheetRef, useValue: bottomSheetRefStub },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReminderTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
