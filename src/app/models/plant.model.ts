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
  link: string;
  slug: string;
  edibility: Edibility;
  toxicity: Toxicity;
  image: Image;
  growth: string;
  waterRequirement: string;
  lightRequirement: string;
  usdaHardinessZone: string;
  layer: string;
  soilType: string;
}

export interface Edibility {
  edible: boolean;
  parts: string;
}

export interface Toxicity {
  toxic: boolean;
  parts: string;
  organisms: string;
}
