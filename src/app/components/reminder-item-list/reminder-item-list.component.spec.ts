import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { ReminderItemListComponent } from './reminder-item-list.component';

describe('ReminderItemListComponent', () => {
  let component: ReminderItemListComponent;
  let fixture: ComponentFixture<ReminderItemListComponent>;

  const bottomSheetRefStub = { dismiss: jasmine.createSpy('dismiss') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReminderItemListComponent],
      providers: [
        { provide: MatBottomSheetRef, useValue: bottomSheetRefStub },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: [] },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReminderItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
