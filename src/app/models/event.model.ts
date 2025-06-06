export interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  color: string;
}
