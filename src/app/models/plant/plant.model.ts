import { Image } from '.././image.model';

export interface Plant {
  type: string;
  scientificName: string;
  commonName: string;
  name: string;
  family: string;
  genus: string;
  species: string;
  description: string;
  biome: string;
  cycle: string;
  layer: string;
  soilType: string;
  wateringPeriods: WateringPeriod[];
  careRequirement: RequirementLevel;
  lightRequirement: RequirementLevel;
  maintenanceRequirement: RequirementLevel;
  waterRequirement: RequirementLevel;
  anatomy: AnatomicalPart[];
  edibility: Edibility;
  hardinessZone: HardinessZone;
  height: Dimension;
  images: Image[];
  lightDuration: LightDuration;
  toxicity: Toxicity;
  waterConsumptions: WaterConsumption[];
  width: Dimension;
}

export enum RequirementLevel {
  veryLow = 0,
  low = 1,
  medium = 2,
  high = 3,
  veryHigh = 4,
}

export enum WateringPeriod {
  EarlyMorning = 0,
  Morning = 1,
  Midday = 2,
  Afternoon = 3,
  LateAfternoon = 4,
  Night = 5,
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

export interface Seed {
  description: string;
  germination: string;
  germinationTemperature: number;
  germinationTime: string;
  weight: number;
  color: string;
  shape: string;
  texture: string;
  type: string;
}

export interface Toxicity {
  toxic: boolean;
  parts: string;
  organisms: string;
}

export interface WaterConsumption {
  value: number;
  unit: string;
  month: string;
}
