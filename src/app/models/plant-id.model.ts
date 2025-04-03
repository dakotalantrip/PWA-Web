export class PlantIDRequest {
  public files: File[];
  public organ: string = 'flower';

  constructor(files: File[], organ: string) {
    this.files = files;
    this.organ = organ;
  }
}

export interface PlantID {
  query?: PlantIDQuery;
  language?: string;
  preferredReferential?: string;
  switchToProject?: string;
  bestMatch?: string;
  version?: string;
  results?: PlantIDResult[];
  remainingIdentificationRequests: number;
  predictedOrgans?: Model5[];
}

export interface PlantIDQuery {
  project?: string;
  images?: string[];
  organs?: string[];
  includeRelatedImages: boolean;
  noReject: boolean;
  type?: string;
}

export interface PlantIDResult {
  score: number;
  species?: Model4;
  images?: PlantIDImage[];
  gbif?: GBIF;
  powo?: POWO;
  iucn?: IUCN;
}

export interface Model4 {
  scientificNameWithoutAuthor?: string;
  scientificNameAuthorship?: string;
  genus?: TaxonomicRank;
  family?: TaxonomicRank;
  commonNames?: string[];
}

export interface Model5 {
  image?: string;
  fileName?: string;
  organ?: string;
  score: number;
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
  date?: PlantIDImageDate;
  citation?: string;
  url?: PlantIDUrl;
}

export interface PlantIDImageDate {
  timestamp: number;
  string?: string;
}

export interface PlantIDUrl {
  o?: string;
  m?: string;
  s?: string;
}

export interface GBIF {
  id?: string;
}

export interface POWO {
  id?: string;
}

export interface IUCN {
  id?: string;
  category?: string;
}
