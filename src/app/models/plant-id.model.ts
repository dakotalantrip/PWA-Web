export class PlantIDRequest {
  public files: File[];
  public organ: string = 'flower';

  constructor(files: File[], organ: string) {
    this.files = files;
    this.organ = organ;
  }
}

export interface PlantID {
  score: number;
  species?: PlantIDSpecies;
  images?: PlantIDImage[];
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

export interface PlantIDImage {
  organ?: string;
  author?: string;
  license?: string;
  date?: Date;
  url: string;
  citation?: string;
}

export interface IUCN {
  id?: string;
  category?: string;
}
