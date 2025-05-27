export interface GreenhouseRequest {
  name: string;
  plantType: string;
  userId: number;
}

export interface PlantRequest {
  species: string;
  plantingDate: string;
  growthStage: string;
}


export interface GreenhouseSummary {
  id: number;
  name: string;
  plantType: string;
}

export interface PlantResponse {
  id: number;
  species: string;
  plantingDate: string;
  growthStage: string;
  greenhouseId: number;
}