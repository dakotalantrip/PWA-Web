import { Component, Inject, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-dialog',
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './event-dialog.component.html',
  styleUrl: './event-dialog.component.scss'
})
export class EventDialogComponent {
  public formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Event | undefined
  ) {

    this.formGroup = this.formBuilder.group({
      title: this.data ? this.data.title : '',
      description: this.data ? this.data.description : '',
      color: this.data ? this.data.color : '#d6d2d2'
    })
  }

  public get description(): FormControl {
    return this.formGroup.get('description') as FormControl;
  }

  public get title(): FormControl {
    return this.formGroup.get('title') as FormControl;
  }

  public get color(): FormControl {
    return this.formGroup.get('color') as FormControl;
  }

  //#region Events

  public onCloseClick(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.formGroup.valid)
    {
      const updatedEvent: Event = {
        ...this.data,
        ...this.formGroup.value,
      };
      this.dialogRef.close(updatedEvent);
    }
  }

  //#endregion
}
