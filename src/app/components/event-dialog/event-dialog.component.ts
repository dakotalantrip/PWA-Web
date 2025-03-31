import { Component, Inject, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-event-dialog',
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatInputModule],
  templateUrl: './event-dialog.component.html',
  styleUrl: './event-dialog.component.scss'
})
export class EventDialogComponent {
  eventTitle = '';

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { date: string }
  ) {}

  saveEvent() {
    if (this.eventTitle.trim()) {
      this.dialogRef.close({ title: this.eventTitle, date: this.data.date });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
