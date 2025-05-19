import { MultiSeries, SingleSeries } from '@swimlane/ngx-charts';
import { PaginatedResult } from '../models/paginated-result.model';
import { PlantID } from '../models/plant/plant-id.model';
import { PriorityLevelEnum, Reminder } from '../models/reminder.model';

export function createPaginatedResult<T>(items: T[], totalItems: number, totalPages: number): PaginatedResult<T> {
  return {
    currentPage: 1,
    items: items,
    hasPreviousPage: false,
    hasNextPage: true,
    pageSize: 10,
    totalItems: totalItems,
    totalPages: totalPages,
  };
}

export function createPlantID(scientificName: string, score: number, commonNames: string[] = []): PlantID {
  return {
    scientificName: scientificName,
    score: score,
    commonNames: commonNames,
    images: [
      {
        url: 'https://commons.wikimedia.org/w/index.php?search=Iris+%28Iridaceae%29&title=Special%3ASearch&ns0=1&ns6=1&ns12=1&ns14=1&ns100=1&ns106=1#/media/File:Iris_ensata_Thunb.jpg',
        attribution: '',
        license: '',
        licenseUrl: 'https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia',
      },
    ],
  };
}

export function createReminder(
  id: number = 0,
  description?: string,
  notes?: string,
  priorityLevel: PriorityLevelEnum = PriorityLevelEnum.Low,
): Reminder {
  return {
    id: id,
    description: description,
    notes: notes,
    priorityLevel: priorityLevel,
    isCompleted: false,
    completedOn: undefined,
  };
}

export function createMultiSeries(length: number = 10): MultiSeries {
  return Array.from({ length: length }, (_, index) => {
    return {
      name: `Series ${index}`,
      series: Array.from({ length: 5 }, (_, index) => {
        return { name: `Item ${index}`, value: Math.random() * 100 };
      }),
    };
  });
}

export function createSingleSeries(length: number = 5): SingleSeries {
  return Array.from({ length: length }, (_, index) => {
    return { name: `Item ${index}`, value: Math.random() * 100 };
  });
}
