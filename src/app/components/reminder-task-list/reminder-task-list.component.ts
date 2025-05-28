import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

import { MatSymbolDirective } from '../../directives/mat-symbol.directive';
import { PriorityLevelEnum, ReminderTask } from '../../models/reminder.model';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-reminder-task-list',
  imports: [
    DatePipe,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatSymbolDirective,
    MatTooltipModule,
  ],
  templateUrl: './reminder-task-list.component.html',
  styleUrl: './reminder-task-list.component.scss',
})
export class ReminderTaskListComponent {
  public priorityLevelEnum: typeof PriorityLevelEnum = PriorityLevelEnum;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ReminderTaskListComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data?: ReminderTask[],
  ) {}

  //#region Events

  public onAddClick(): void {
    this.bottomSheetRef.dismiss({ action: 'add' });
  }

  public onCompleteClick(task: ReminderTask): void {
    this.bottomSheetRef.dismiss({ id: task.id, action: 'complete' });
  }

  public onDeleteClick(task: ReminderTask): void {
    this.bottomSheetRef.dismiss({ id: task.id, action: 'delete' });
  }

  public onEditClick(task: ReminderTask): void {
    this.bottomSheetRef.dismiss({ task: task, action: 'edit' });
  }

  //#endregion
}
