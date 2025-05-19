import { PriorityLevelEnum } from '../models/reminder.model';
import { createReminder } from './mock-data.factory';

export const mockReminderLowPriority = createReminder(0, 'low priority description', 'test notes');
export const mockReminderMediumPriority = createReminder(
  0,
  'medium priority description',
  'test notes',
  PriorityLevelEnum.Medium,
);
export const mockReminderHighPriority = createReminder(
  0,
  'high priority description',
  'test notes',
  PriorityLevelEnum.High,
);
export const mockReminders = Array.from({ length: 20 }, (_, index) => {
  return createReminder(index, `Description ${index}`, '', Math.floor(Math.random() * (3 - 1) + 1));
});
