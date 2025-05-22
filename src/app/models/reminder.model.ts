export interface Reminder {
  id: number;
  description: string;
  notes?: string | null;
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
  tasks: ReminderTask[];
}

export interface ReminderTask {
  id: number;
  description?: string;
  priorityLevel: PriorityLevelEnum;
  isCompleted: boolean;
  completedOn?: Date;
  url?: string;
}

export enum PriorityLevelEnum {
  'None' = 0,
  'Low' = 1,
  'Medium' = 2,
  'High' = 3,
}

export enum RecurrenceUnit {
  None,
  Day,
  Week,
  Month,
  Year,
}
