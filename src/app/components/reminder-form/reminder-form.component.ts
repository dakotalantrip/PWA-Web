import { Component } from '@angular/core';
import { MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FormControls } from '../../models/form-controls.model';
import { PriorityLevelEnum, Reminder } from '../../models/reminder.model';

@Component({
  selector: 'app-reminder-form',
  imports: [
    MatBottomSheetModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './reminder-form.component.html',
  styleUrl: './reminder-form.component.scss',
})
export class ReminderFormComponent {
  public form: FormGroup<Partial<FormControls<Reminder>>>;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ReminderFormComponent>,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group<Partial<FormControls<Reminder>>>({
      description: new FormControl(),
      notes: new FormControl(),
      priorityLevel: new FormControl(PriorityLevelEnum.Low, { nonNullable: true }),
    });
  }

  public onSubmit(): void {
    this.bottomSheetRef.dismiss(this.form.getRawValue());
  }
}
