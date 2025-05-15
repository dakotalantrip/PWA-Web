export interface Reminder {
  id: number;
  description?: string;
  notes?: string;
  priorityLevel: PriorityLevelEnum;
  isCompleted: boolean;
  completedOn?: Date;
}

export enum PriorityLevelEnum {
  'None' = 0,
  'Low' = 1,
  'Medium' = 2,
  'High' = 3,
}
