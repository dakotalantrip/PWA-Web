import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

import { BaseApiService } from './base-api.service';
import { Reminder, ReminderItem, ReminderTask } from '../models/reminder.model';

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

  public add(reminder: Reminder): Observable<Reminder[]> {
    return this.post<Reminder>('Add', reminder).pipe(switchMap(() => this.getAll()));
  }

  public addItem(id: number, reminderItem: ReminderItem): Observable<Reminder[]> {
    return this.post<ReminderItem>(`AddItem${id}`, reminderItem).pipe(switchMap(() => this.getAll()));
  }

  public addTask(id: number, reminderTask: ReminderTask): Observable<Reminder[]> {
    return this.post<ReminderItem>(`AddTask${id}`, reminderTask).pipe(switchMap(() => this.getAll()));
  }

  public complete(id: number): Observable<Reminder[]> {
    return this.put<Reminder>(`Complete${id}`, null).pipe(switchMap(() => this.getAll()));
  }

  public deleteReminder(id: number): Observable<Reminder[]> {
    return this.delete<void>(`${id}`).pipe(switchMap(() => this.getAll()));
  }

  public update(reminder: Reminder): Observable<Reminder[]> {
    return this.put<Reminder>('Update', reminder).pipe(switchMap(() => this.getAll()));
  }

  public getAll(): Observable<Reminder[]> {
    return this.get<Reminder[]>('GetByUser').pipe(
      tap((response: Reminder[]) => {
        this.reminders = response;
      }),
    );
  }
}
