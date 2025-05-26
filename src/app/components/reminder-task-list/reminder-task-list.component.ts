import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Reminder } from '../../models/reminder.model';

@Component({
  selector: 'app-reminder-task-list',
  imports: [],
  templateUrl: './reminder-task-list.component.html',
  styleUrl: './reminder-task-list.component.scss',
})
export class ReminderTaskListComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data?: Reminder) {}
}
