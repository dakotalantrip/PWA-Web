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

export class ReminderView implements Reminder {
  id: number = 0;
  title: string = '';
  description?: string | null | undefined;
  priorityLevel: PriorityLevelEnum = PriorityLevelEnum.Low;
  isCompleted: boolean = false;
  completedOn?: Date | undefined;
  isRecurring: boolean = false;
  recurrenceUnit?: RecurrenceUnit | null | undefined;
  recurrenceInterval?: number | null | undefined;
  recurrenceCount?: number | null | undefined;
  occurrenceCounter?: number | undefined;
  endDate?: Date | null | undefined;
  startDate?: Date | null | undefined;
  nextOccurrence?: Date | undefined;
  items: ReminderItem[] = [];
  tasks: ReminderTask[] = [];
  createdOn: Date = new Date();
  updatedOn?: Date | null | undefined;

  constructor(reminder?: Reminder) {
    if (reminder) {
      this.id = reminder.id;
      this.title = reminder.title;
      this.description = reminder.description;
      this.priorityLevel = reminder.priorityLevel;
      this.isCompleted = reminder.isCompleted;
      this.completedOn = reminder.completedOn;
      this.isRecurring = reminder.isRecurring;
      this.recurrenceUnit = reminder.recurrenceUnit;
      this.recurrenceInterval = reminder.recurrenceInterval;
      this.recurrenceCount = reminder.recurrenceCount;
      this.occurrenceCounter = reminder.occurrenceCounter;
      this.endDate = reminder.endDate;
      this.startDate = reminder.startDate;
      this.nextOccurrence = reminder.nextOccurrence;
      this.items = reminder.items || [];
      this.tasks = reminder.tasks || [];
      this.createdOn = reminder.createdOn || new Date();
      this.updatedOn = reminder.updatedOn || null;
    }
  }

  public get incompleteTasks(): ReminderTask[] {
    return this.tasks.filter((task) => !task.isCompleted);
  }

  public get incompleteTasksCount(): number {
    return this.incompleteTasks.length;
  }
}

export interface ReminderItem {
  id: number;
  reminderId: number;
  description: string;
  url?: string;
  createdOn: Date;
  updatedOn?: Date | null;
}

export interface ReminderTask {
  id: number;
  reminderId: number;
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
