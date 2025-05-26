import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormControls } from '../../models/form-controls.model';
import { ReminderItem } from '../../models/reminder.model';

@Component({
  selector: 'app-reminder-item-form',
  imports: [MatBottomSheetModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './reminder-item-form.component.html',
  styleUrl: './reminder-item-form.component.scss',
})
export class ReminderItemFormComponent {
  public form: FormGroup<Partial<FormControls<ReminderItem>>>;
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ReminderItemFormComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data?: ReminderItem,
  ) {
    this.form = this.formBuilder.group<Partial<FormControls<ReminderItem>>>({
      description: new FormControl(this.data?.description ?? '', { nonNullable: true }),
      url: new FormControl(this.data?.url ?? '', { nonNullable: true }),
    });
  }

  public onSubmit(): void {
    const formData = this.form.getRawValue();
    if (this.data) {
      const result: ReminderItem = {
        ...this.data,
        ...formData,
      };
      this.bottomSheetRef.dismiss(result);
    } else {
      this.bottomSheetRef.dismiss(formData);
    }
  }
}
