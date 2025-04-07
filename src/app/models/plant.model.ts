export interface Plant {
  id: number;
  type: string;
  scientificName: string;
  name: string;
  version: number;
  description: string;
  link: string;
  parentId: number | null;
  slug: string;
  updatedAt: Date;
  createdAt: Date;
  edibility: Edibility;
  growth: string;
  waterRequirement: string;
  lightRequirement: string;
  usdaHardinessZone: string;
  layer: string;
  soilType: string;
  data: PlantData[];
}

export interface PlantData {
  key: string;
  value: string;
}

export interface Edibility {
  edible: boolean;
  parts: string[];
}
