import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { exhaustMap, filter, Observable, Subject, Subscription, switchMap } from 'rxjs';

import { MatSymbolDirective } from '../../directives/mat-symbol.directive';
import { PriorityLevelEnum, Reminder } from '../../models/reminder.model';
import { ReminderFormComponent } from '../../components/reminder-form/reminder-form.component';
import { ReminderService } from '../../services/reminder.service';

@Component({
  selector: 'app-reminders',
  imports: [
    AsyncPipe,
    DatePipe,
    MatBottomSheetModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSymbolDirective,
    MatTooltipModule,
  ],
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.scss',
})
export class RemindersComponent implements OnInit, OnDestroy {
  private add$: Subject<void> = new Subject<void>();
  private complete$: Subject<number> = new Subject<number>();
  private delete$: Subject<number> = new Subject<number>();
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
      this.complete$.pipe(exhaustMap((value: number) => this.reminderService.complete(value))).subscribe(),
    );
    this.subscription.add(
      this.delete$.pipe(exhaustMap((value: number) => this.reminderService.deleteReminder(value))).subscribe(),
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

  public onCompleteClick(id: number): void {
    this.complete$.next(id);
  }

  public onDeleteClick(id: number): void {
    this.delete$.next(id);
  }

  public onEditClick(reminder: Reminder): void {}

  //#endregion
}
