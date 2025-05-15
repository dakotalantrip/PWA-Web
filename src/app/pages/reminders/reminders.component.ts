import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatSymbolDirective } from '../../directives/mat-symbol.directive';
import { Reminder } from '../../models/reminder.model';
import { ReminderFormComponent } from '../../components/reminder-form/reminder-form.component';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { ReminderService } from '../../services/reminder.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-reminders',
  imports: [MatBottomSheetModule, MatButtonModule, MatDividerModule, MatIconModule, MatSymbolDirective],
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.scss',
})
export class RemindersComponent implements OnInit {
  public reminders: Reminder[] = [];

  constructor(
    private bottomSheet: MatBottomSheet,
    private reminderService: ReminderService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.reminders = this.route.snapshot.data['reminders'];
  }

  //#region Events

  public onAddClick(): void {
    this.bottomSheet
      .open(ReminderFormComponent)
      .afterDismissed()
      .pipe(
        filter((value: Reminder | undefined) => value !== undefined),
        switchMap((result: Reminder) => this.add$(result)),
      )
      .subscribe();
  }

  public onCompleteClick(id: number): void {
    this.reminderService.complete(id).subscribe();
  }

  public onDeleteClick(id: number): void {
    this.reminderService.deleteReminder(id).subscribe();
  }

  //#endregion

  private add$(reminder: Reminder): Observable<Reminder | null> {
    return this.reminderService.add(reminder).pipe(
      tap((result: Reminder | null) => {
        if (result) {
          this.reminders.push(result);
        }
      }),
    );
  }
}
