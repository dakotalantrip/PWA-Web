export interface IndoorWateringScheduleRequest {
  plantName: string;
  roomTemperature: number;
  humidityLevel: number;
  lightExposure: 'Low' | 'Medium' | 'Bright indirect' | 'Direct sun';
  airflow: 'Poor' | 'Moderate' | 'Good';
  location: string;
  wateringMethod: 'Top water' | 'Bottom soak' | 'Misting';
  potDrainage: boolean;
  potMaterial: 'Plastic' | 'Terracotta' | 'Ceramic' | 'Metal';
  soilType: string;
  lastWateredDate: string;
}
