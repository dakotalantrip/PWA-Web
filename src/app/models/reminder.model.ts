export interface Reminder {
  id: number;
  title: string;
  description?: string | null;
  priorityLevel: PriorityLevelEnum;
  isCompleted: boolean;
  completedOn?: Date;
  isRecurring: boolean;
  recurrenceUnit?: RecurrenceUnit | null;
  recurrenceInterval?: number | null;
  recurrenceCount?: number | null;
  occurrenceCounter?: number;
  endDate?: Date | null;
  startDate?: Date | null;
  nextOccurrence?: Date;
  items: ReminderItem[];
  tasks: ReminderTask[];
  createdOn: Date;
  updatedOn?: Date | null;
}

export interface ReminderItem {
  id: number;
  description: string;
  url?: string;
  createdOn: Date;
  updatedOn?: Date | null;
}

export interface ReminderTask {
  id: number;
  description?: string;
  priorityLevel: PriorityLevelEnum;
  isCompleted: boolean;
  completedOn?: Date;
  url?: string;
  createdOn: Date;
  updatedOn?: Date | null;
}

export enum PriorityLevelEnum {
  'Low' = 0,
  'Medium' = 1,
  'High' = 2,
}

export enum RecurrenceUnit {
  None,
  Day,
  Week,
  Month,
  Year,
}
