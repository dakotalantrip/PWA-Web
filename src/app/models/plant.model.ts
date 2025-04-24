import { Image } from './image.model';

export interface Plant {
  type: string;
  scientificName: string;
  commonName: string;
  name: string;
  family: string;
  genus: string;
  species: string;
  description: string;
  cycle: string;
  layer: string;
  soilType: string;
  wateringPeriods: string[];
  careRequirement: RequirementLevel;
  lightRequirment: RequirementLevel;
  maintenanceRequirement: RequirementLevel;
  waterRequirement: RequirementLevel;
  anatomy: AnatomicalPart[];
  edibility: Edibility;
  hardinessZone: HardinessZone;
  height: Dimension;
  images: Image[];
  lightDuration: LightDuration;
  toxicity: Toxicity;
  waterFrequency: WaterFrequency;
}

export enum RequirementLevel {
  'veryLow' = 0,
  'low' = 1,
  'medium' = 2,
  'high' = 3,
  'veryHigh' = 4,
}

export interface AnatomicalPart {
  name: string;
  colors: string[];
}

export interface Dimension {
  value: number;
  unit: string;
}

export interface Edibility {
  edible: boolean;
  parts: string;
}

export interface HardinessZone {
  max: number;
  min: number;
}

export interface LightDuration {
  max: number;
  min: number;
  unit: number;
}

export interface Toxicity {
  toxic: boolean;
  parts: string;
  organisms: string;
}

export interface WaterFrequency {
  value: number;
  unit: string;
}
