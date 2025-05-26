import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { exhaustMap, filter, Observable, Subject, Subscription, switchMap } from 'rxjs';

import { MatSymbolDirective } from '../../directives/mat-symbol.directive';
import { PriorityLevelEnum, Reminder, ReminderItem, ReminderTask } from '../../models/reminder.model';
import { ReminderFormComponent } from '../../components/reminder-form/reminder-form.component';
import { ReminderService } from '../../services/reminder.service';
import { ReminderItemFormComponent } from '../../components/reminder-item-form/reminder-item-form.component';
import { ReminderTaskFormComponent } from '../../components/reminder-task-form/reminder-task-form.component';
import { ReminderTaskListComponent } from '../../components/reminder-task-list/reminder-task-list.component';
import { ReminderItemListComponent } from '../../components/reminder-item-list/reminder-item-list.component';

@Component({
  selector: 'app-reminders',
  imports: [
    AsyncPipe,
    DatePipe,
    MatBottomSheetModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatSymbolDirective,
    MatTooltipModule,
  ],
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.scss',
})
export class RemindersComponent implements OnInit, OnDestroy {
  private add$: Subject<void> = new Subject<void>();
  private addItem$: Subject<Reminder> = new Subject<Reminder>();
  private addTask$: Subject<Reminder> = new Subject<Reminder>();
  private complete$: Subject<number> = new Subject<number>();
  private delete$: Subject<number> = new Subject<number>();
  private edit$: Subject<Reminder> = new Subject<Reminder>();
  private subscription: Subscription = new Subscription();

  public priorityLevelEnum: typeof PriorityLevelEnum = PriorityLevelEnum;
  public reminders$: Observable<Reminder[]>;

  constructor(
    private bottomSheet: MatBottomSheet,
    private reminderService: ReminderService,
  ) {
    this.reminders$ = this.reminderService.reminders$;
  }

  //#region Lifecycle

  ngOnInit(): void {
    this.subscription.add(
      this.add$
        .pipe(
          exhaustMap(() =>
            this.bottomSheet
              .open(ReminderFormComponent)
              .afterDismissed()
              .pipe(
                filter((value: Reminder | undefined) => value !== undefined),
                switchMap((value: Reminder) => this.reminderService.add(value)),
              ),
          ),
        )
        .subscribe(),
    );
    this.subscription.add(
      this.addItem$
        .pipe(
          exhaustMap((reminder: Reminder) =>
            this.bottomSheet
              .open(ReminderItemFormComponent)
              .afterDismissed()
              .pipe(
                filter((value: ReminderItem | undefined) => value !== undefined),
                switchMap((value: ReminderItem) => this.reminderService.addItem(reminder.id, value)),
              ),
          ),
        )
        .subscribe(),
    );
    this.subscription.add(
      this.addTask$
        .pipe(
          exhaustMap((reminder: Reminder) =>
            this.bottomSheet
              .open(ReminderTaskFormComponent)
              .afterDismissed()
              .pipe(
                filter((value: ReminderTask | undefined) => value !== undefined),
                switchMap((value: ReminderTask) => this.reminderService.addTask(reminder.id, value)),
              ),
          ),
        )
        .subscribe(),
    );
    this.subscription.add(
      this.complete$.pipe(exhaustMap((value: number) => this.reminderService.complete(value))).subscribe(),
    );
    this.subscription.add(
      this.delete$.pipe(exhaustMap((value: number) => this.reminderService.deleteReminder(value))).subscribe(),
    );
    this.subscription.add(
      this.edit$
        .pipe(
          exhaustMap((value: Reminder) =>
            this.bottomSheet
              .open(ReminderFormComponent, { data: value })
              .afterDismissed()
              .pipe(
                filter((value: Reminder | undefined) => value !== undefined),
                switchMap((value: Reminder) => this.reminderService.update(value)),
              ),
          ),
        )
        .subscribe(),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //#endregion

  //#region Events

  public onAddClick(): void {
    this.add$.next();
  }

  public onAddItemClick(reminder: Reminder): void {
    this.addItem$.next(reminder);
  }

  public onAddTaskClick(reminder: Reminder): void {
    this.addTask$.next(reminder);
  }

  public onCompleteClick(id: number): void {
    this.complete$.next(id);
  }

  public onDeleteClick(id: number): void {
    this.delete$.next(id);
  }

  public onEditClick(reminder: Reminder): void {
    this.edit$.next(reminder);
  }

  public onViewItemsClick(reminder: Reminder): void {
    this.bottomSheet.open(ReminderItemListComponent, { data: reminder });
  }

  public onViewTasksClick(reminder: Reminder): void {
    this.bottomSheet.open(ReminderTaskListComponent, { data: reminder });
  }

  //#endregion
}
