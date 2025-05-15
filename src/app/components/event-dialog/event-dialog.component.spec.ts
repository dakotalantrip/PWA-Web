import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventDialogComponent } from './event-dialog.component';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('EventDialogComponent', () => {
  let component: EventDialogComponent;
  let fixture: ComponentFixture<EventDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: undefined },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
