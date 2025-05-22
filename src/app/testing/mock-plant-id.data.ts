import { createPlantID, createPaginatedResult } from './mock-data.factory';
import { PaginatedResult } from '../models/paginated-result.model';
import { PlantID } from '../models/plant/plant-id.model';

export const mockPlantIDs: PlantID[] = Array.from({ length: 30 }, (_, index) => {
  const value = index + 1;
  return createPlantID(`Scientific name: ${value}`, Math.random() * 100);
});

export const mockPaginatedResult: PaginatedResult<PlantID> = createPaginatedResult<PlantID>(
  mockPlantIDs,
  mockPlantIDs.length,
  Math.ceil(mockPlantIDs.length % 10),
);
