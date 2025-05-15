import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { BaseApiService } from './base-api.service';
import { Reminder } from '../models/reminder.model';

@Injectable({
  providedIn: 'root',
})
export class ReminderService extends BaseApiService {
  private remindersSubject: BehaviorSubject<Reminder[]> = new BehaviorSubject<Reminder[]>([]);

  public reminders$: Observable<Reminder[]> = this.remindersSubject.asObservable();

  constructor(http: HttpClient) {
    super(http, 'Reminder');
  }

  public get reminders(): Reminder[] {
    return this.remindersSubject.getValue();
  }

  public set reminders(value: Reminder[]) {
    this.remindersSubject.next(value);
  }

  public add(reminder: Reminder): Observable<Reminder | null> {
    return this.post<Reminder>('Add', reminder).pipe(
      tap((addedReminder: Reminder) => {
        if (addedReminder) {
          this.reminders = [...this.remindersSubject.value, addedReminder];
        }
      }),
    );
  }

  public complete(id: number): Observable<Reminder> {
    return this.put<Reminder>(`Complete${id}`, null).pipe(
      tap((updatedReminder: Reminder) => {
        const updatedReminders: Reminder[] = this.reminders.map((value: Reminder) =>
          id === value.id ? updatedReminder : value,
        );
        this.reminders = updatedReminders;
      }),
    );
  }

  public deleteReminder(id: number): Observable<void> {
    return this.delete<void>(`${id}`).pipe(
      tap(() => {
        this.reminders = this.reminders.filter((reminder: Reminder) => reminder.id !== id);
      }),
    );
  }

  public getAll(): Observable<Reminder[]> {
    return this.reminders.length
      ? this.reminders$
      : this.get<Reminder[]>('GetByUser').pipe(
          tap((response: Reminder[]) => {
            this.reminders = response;
          }),
        );
  }
}
