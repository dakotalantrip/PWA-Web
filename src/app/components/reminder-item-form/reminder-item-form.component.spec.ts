import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderItemFormComponent } from './reminder-item-form.component';

describe('ReminderItemFormComponent', () => {
  let component: ReminderItemFormComponent;
  let fixture: ComponentFixture<ReminderItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReminderItemFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReminderItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
