import { Image } from './image.model';

export class PlantIDImageRequest {
  public files: File[];
  public organ: string = 'flower';

  constructor(files: File[], organ: string) {
    this.files = files;
    this.organ = organ;
  }
}

export interface PlantIDSearchResult {
  scientificName: string;
  commonName: string;
  images: Image[];
}

export interface PlantID {
  score: number;
  species?: PlantIDSpecies;
  images?: Image[];
  gbif_id?: string;
  powo_id?: string;
  iucn?: IUCN;
}

export interface PlantIDSpecies {
  scientificNameWithoutAuthor?: string;
  scientificNameAuthorship?: string;
  genus?: TaxonomicRank;
  family?: TaxonomicRank;
  commonNames?: string[];
}

export interface TaxonomicRank {
  scientificNameWithoutAuthor?: string;
  scientificNameAuthorship?: string;
  scientificName?: string;
}

export interface IUCN {
  id?: string;
  category?: string;
}
