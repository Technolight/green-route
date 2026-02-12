export interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

export interface Route {
  geometry: any;
  distance: number;
  duration: number;
}
