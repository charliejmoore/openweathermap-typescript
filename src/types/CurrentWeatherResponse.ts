import {
  CloudData,
  Coordinates,
  WindData,
  WeatherMetricsData,
  WeatherDescriptionData,
} from './shared';

export interface SysData {
  /** Country code (GB, JP etc.). */
  country: string;
  /** Sunrise time, unix, UTC. */
  sunrise: number;
  /** Sunset time, unix, UTC. */
  sunset: number;
}

export interface CurrentWeatherResponse {
  /** Coordinates of weather location. */
  coord: Coordinates;
  /** Essential weather information including description (e.g., 'Cloudy'), etc. */
  weather: WeatherDescriptionData[];
  /** Internal parameter. */
  base: string;
  /** Main weather metrics including temperature, humidity, pressure, etc.. */
  main: WeatherMetricsData;
  /** Visibility, meter. The maximum value of the visibility is 10 km. */
  visibility: number;
  /** Wind speed, gust, direction. */
  wind: WindData;
  /** Cloud data. */
  clouds: CloudData;
  /** Time of data calculation, unix, UTC. */
  dt: number;
  /** Includes sunrise and sunset time data. */
  sys: SysData;
  /** Shift in seconds from UTC. */
  timezone: number;
  /** City id. */
  id: number;
  /** City name. */
  name: string;
  /** Internal parameter. */
  cod: number;
}
