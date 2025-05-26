import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormControls } from '../../models/form-controls.model';
import { PriorityLevelEnum, ReminderTask } from '../../models/reminder.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-reminder-task-form',
  imports: [
    MatBottomSheetModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reminder-task-form.component.html',
  styleUrl: './reminder-task-form.component.scss',
})
export class ReminderTaskFormComponent {
  public form: FormGroup<Partial<FormControls<ReminderTask>>>;
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ReminderTaskFormComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data?: ReminderTask,
  ) {
    this.form = this.formBuilder.group<Partial<FormControls<ReminderTask>>>({
      description: new FormControl(this.data?.description ?? '', { nonNullable: true }),
      priorityLevel: new FormControl(this.data?.priorityLevel ?? PriorityLevelEnum.Low, { nonNullable: true }),
      url: new FormControl(this.data?.url ?? '', { nonNullable: true }),
    });
  }

  public onSubmit(): void {
    const formData = this.form.getRawValue();
    if (this.data) {
      const result: ReminderTask = {
        ...this.data,
        ...formData,
      };
      this.bottomSheetRef.dismiss(result);
    } else {
      this.bottomSheetRef.dismiss(formData);
    }
  }
}
