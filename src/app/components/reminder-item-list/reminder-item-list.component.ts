import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

import { MatSymbolDirective } from '../../directives/mat-symbol.directive';
import { ReminderItem } from '../../models/reminder.model';

@Component({
  selector: 'app-reminder-item-list',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule, MatSymbolDirective, MatTooltipModule],
  templateUrl: './reminder-item-list.component.html',
  styleUrl: './reminder-item-list.component.scss',
})
export class ReminderItemListComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ReminderItemListComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data?: ReminderItem[],
  ) {}

  //#region Events

  public onDeleteClick(item: ReminderItem): void {
    this.bottomSheetRef.dismiss({ id: item.id, action: 'delete' });
  }

  public onEditClick(item: ReminderItem): void {
    this.bottomSheetRef.dismiss({ item: item, action: 'edit' });
  }

  //#endregion
}
