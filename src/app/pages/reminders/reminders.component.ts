import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { exhaustMap, filter, map, Observable, Subject, Subscription, switchMap, tap } from 'rxjs';

import { MatSymbolDirective } from '../../directives/mat-symbol.directive';
import { PriorityLevelEnum, Reminder, ReminderItem, ReminderTask, ReminderView } from '../../models/reminder.model';
import { ReminderFormComponent } from '../../components/reminder-form/reminder-form.component';
import { ReminderService } from '../../services/reminder.service';
import { ReminderItemFormComponent } from '../../components/reminder-item-form/reminder-item-form.component';
import { ReminderItemListComponent } from '../../components/reminder-item-list/reminder-item-list.component';
import { ReminderTaskFormComponent } from '../../components/reminder-task-form/reminder-task-form.component';
import { ReminderTaskListComponent } from '../../components/reminder-task-list/reminder-task-list.component';

@Component({
  selector: 'app-reminders',
  imports: [
    AsyncPipe,
    DatePipe,
    MatBadgeModule,
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
  private completeTask$: Subject<number> = new Subject<number>();
  private delete$: Subject<number> = new Subject<number>();
  private deleteItem$: Subject<number> = new Subject<number>();
  private deleteTask$: Subject<number> = new Subject<number>();
  private edit$: Subject<Reminder> = new Subject<Reminder>();
  private editItem$: Subject<ReminderItem> = new Subject<ReminderItem>();
  private editTask$: Subject<ReminderTask> = new Subject<ReminderTask>();
  private viewItems$: Subject<Reminder> = new Subject<Reminder>();
  private viewTasks$: Subject<Reminder> = new Subject<Reminder>();
  private subscription: Subscription = new Subscription();

  public priorityLevelEnum: typeof PriorityLevelEnum = PriorityLevelEnum;
  public reminders$: Observable<ReminderView[]>;

  constructor(
    private bottomSheet: MatBottomSheet,
    private reminderService: ReminderService,
  ) {
    this.reminders$ = this.reminderService.reminders$.pipe(
      map((reminders: Reminder[]) => reminders.map((reminder: Reminder) => new ReminderView(reminder))),
    );
  }

  //#region Lifecycle

  ngOnInit(): void {
    // Reminders
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

    // Items
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
      this.deleteItem$.pipe(exhaustMap((value: number) => this.reminderService.deleteItem(value))).subscribe(),
    );
    this.subscription.add(
      this.editItem$
        .pipe(
          exhaustMap((value: ReminderItem) =>
            this.bottomSheet
              .open(ReminderItemFormComponent, { data: value })
              .afterDismissed()
              .pipe(
                filter((value: ReminderItem | undefined) => value !== undefined),
                switchMap((value: ReminderItem) => this.reminderService.updateItem(value)),
              ),
          ),
        )
        .subscribe(),
    );
    this.subscription.add(
      this.viewItems$
        .pipe(
          exhaustMap((reminder: Reminder) =>
            this.bottomSheet
              .open(ReminderItemListComponent, { data: reminder.items })
              .afterDismissed()
              .pipe(
                filter((value) => value !== undefined),
                tap((value) => {
                  if (value.action === 'add') {
                    this.addItem$.next(reminder);
                  } else if (value.action === 'delete') {
                    this.deleteItem$.next(value.id);
                  } else if (value.action === 'edit') {
                    this.editItem$.next(value.item);
                  }
                }),
              ),
          ),
        )
        .subscribe(),
    );

    // Tasks
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
      this.completeTask$.pipe(exhaustMap((value: number) => this.reminderService.completeTask(value))).subscribe(),
    );
    this.subscription.add(
      this.deleteTask$.pipe(exhaustMap((value: number) => this.reminderService.deleteTask(value))).subscribe(),
    );
    this.subscription.add(
      this.editTask$
        .pipe(
          exhaustMap((value: ReminderTask) =>
            this.bottomSheet
              .open(ReminderTaskFormComponent, { data: value })
              .afterDismissed()
              .pipe(
                filter((value: ReminderTask | undefined) => value !== undefined),
                switchMap((value: ReminderTask) => this.reminderService.updateTask(value)),
              ),
          ),
        )
        .subscribe(),
    );
    this.subscription.add(
      this.viewTasks$
        .pipe(
          exhaustMap((reminder: Reminder) =>
            this.bottomSheet
              .open(ReminderTaskListComponent, { data: reminder.tasks })
              .afterDismissed()
              .pipe(
                filter((value) => value !== undefined),
                tap((value) => {
                  if (value.action === 'add') {
                    this.addTask$.next(reminder);
                  } else if (value.action === 'complete') {
                    this.completeTask$.next(value.id);
                  } else if (value.action === 'delete') {
                    this.deleteTask$.next(value.id);
                  } else if (value.action === 'edit') {
                    this.editTask$.next(value.task);
                  }
                }),
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
    this.viewItems$.next(reminder);
  }

  public onViewTasksClick(reminder: Reminder): void {
    this.viewTasks$.next(reminder);
  }

  //#endregion
}
