import { By } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSelect } from '@angular/material/select';

import { PriorityLevelEnum } from '../../models/reminder.model';
import { ReminderFormComponent } from './reminder-form.component';
import { mockReminderLowPriority } from '../../testing/mock-reminder.data';

describe('ReminderFormComponent', () => {
  let component: ReminderFormComponent;
  let fixture: ComponentFixture<ReminderFormComponent>;

  const mockPriorityLevel: PriorityLevelEnum = PriorityLevelEnum.Low;
  const bottomSheetRefStub = { dismiss: jasmine.createSpy('dismiss') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatBottomSheetRef, useValue: bottomSheetRefStub },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
        FormBuilder,
      ],
      imports: [ReminderFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReminderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the FormGroup with correct FormControls', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.get('description')).toBeTruthy();
    expect(component.form.get('notes')).toBeTruthy();
    expect(component.form.get('priorityLevel')).toBeTruthy();
  });

  it('should render with the "priorityLevel" FormControl to "Low"', () => {
    const formControl = component.form.get('priorityLevel');
    expect(formControl).toBeTruthy();
    expect(formControl?.value).toBe(mockPriorityLevel);

    const matSelect = fixture.debugElement.query(By.directive(MatSelect)).componentInstance as MatSelect;
    expect(matSelect.value).toBe(mockPriorityLevel);
  });

  it('should call "onSubmit" when form is submitted', () => {
    spyOn(component, 'onSubmit');

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    submitButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should return data from the FormGroup when form is submitted', () => {
    component.form.setValue({
      description: mockReminderLowPriority.description,
      notes: mockReminderLowPriority.notes,
      priorityLevel: mockReminderLowPriority.priorityLevel,
      isRecurring: mockReminderLowPriority.isRecurring,
      recurrenceInterval: mockReminderLowPriority.recurrenceInterval,
      recurrenceCount: mockReminderLowPriority.recurrenceCount,
      recurrenceUnit: mockReminderLowPriority.recurrenceUnit,
      startDate: mockReminderLowPriority.startDate,
      endDate: mockReminderLowPriority.endDate,
    });

    component.onSubmit();
    expect(bottomSheetRefStub.dismiss).toHaveBeenCalledWith(component.form.value);
  });

  it('should close the "MatBottomSheet" when form is submitted', () => {
    bottomSheetRefStub.dismiss.calls.reset();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    submitButton.nativeElement.click();
    fixture.detectChanges();

    expect(bottomSheetRefStub.dismiss).toHaveBeenCalledWith(component.form.value);
  });
});
