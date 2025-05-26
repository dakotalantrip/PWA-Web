import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderTaskListComponent } from './reminder-task-list.component';

describe('ReminderTaskListComponent', () => {
  let component: ReminderTaskListComponent;
  let fixture: ComponentFixture<ReminderTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReminderTaskListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReminderTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
