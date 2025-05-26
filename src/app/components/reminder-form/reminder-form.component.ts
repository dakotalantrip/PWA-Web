import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideNativeDateAdapter } from '@angular/material/core';

import { FormControls } from '../../models/form-controls.model';
import { PriorityLevelEnum, RecurrenceUnit, Reminder } from '../../models/reminder.model';

@Component({
  selector: 'app-reminder-form',
  imports: [
    MatBottomSheetModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './reminder-form.component.html',
  styleUrl: './reminder-form.component.scss',
})
export class ReminderFormComponent {
  public form: FormGroup<Partial<FormControls<Reminder>>>;
  public recurrenceUnit: typeof RecurrenceUnit = RecurrenceUnit;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ReminderFormComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data?: Reminder,
  ) {
    this.form = this.formBuilder.group<Partial<FormControls<Reminder>>>({
      title: new FormControl(this.data?.title ?? '', { nonNullable: true }),
      description: new FormControl(this.data?.description, { nonNullable: true }),
      priorityLevel: new FormControl(this.data?.priorityLevel ?? PriorityLevelEnum.Low, { nonNullable: true }),
      isRecurring: new FormControl(this.data?.isRecurring ?? false, { nonNullable: true }),
      recurrenceInterval: new FormControl(this.data?.recurrenceInterval, { nonNullable: false }),
      recurrenceUnit: new FormControl(this.data?.recurrenceUnit),
      recurrenceCount: new FormControl(this.data?.recurrenceCount, { nonNullable: false }),
      endDate: new FormControl(this.data?.endDate),
      startDate: new FormControl(this.data?.startDate),
    });
  }

  public onSubmit(): void {
    const formData = this.form.getRawValue();
    if (this.data) {
      const result: Reminder = {
        ...this.data,
        ...formData,
      };
      this.bottomSheetRef.dismiss(result);
    } else {
      this.bottomSheetRef.dismiss(formData);
    }
  }
}
