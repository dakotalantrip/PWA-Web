import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, EMPTY, Observable, of } from 'rxjs';

import { Reminder } from '../models/reminder.model';
import { ReminderService } from '../services/reminder.service';

@Injectable({ providedIn: 'root' })
export class RemindersResolver implements Resolve<Reminder[]> {
  constructor(private reminderService: ReminderService) {}

  resolve(): Observable<Reminder[]> {
    return this.reminderService.getAll().pipe(
      catchError(() => {
        return EMPTY;
      }),
    );
  }
}
