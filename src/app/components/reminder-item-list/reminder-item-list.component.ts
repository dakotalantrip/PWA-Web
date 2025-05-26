import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Reminder } from '../../models/reminder.model';

@Component({
  selector: 'app-reminder-item-list',
  imports: [],
  templateUrl: './reminder-item-list.component.html',
  styleUrl: './reminder-item-list.component.scss',
})
export class ReminderItemListComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data?: Reminder) {}
}
