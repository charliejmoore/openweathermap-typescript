import { RainData, SnowData } from './shared';
import { CloudData } from './shared/CloudData';
import { Coordinates } from './shared/Coordinates';
import { WeatherDescriptionData } from './shared/WeatherDescriptionData';
import { WeatherMetricsData } from './shared/WeatherMetricsData';
import { WindData } from './shared/WindData';

export type PartOfDay =
  /** Night. */
  | 'n'
  /** Day. */
  | 'd';

/**
 * Represents a single forecast time slot (e.g., every 3 hours).
 */
export interface ForecastItem {
  /** Time of data forecasted, Unix, UTC. */
  dt: number;
  /** Main weather parameters. */
  main: WeatherMetricsData;
  /** Array of weather condition info (usually one item). */
  weather: WeatherDescriptionData[];
  /** Cloudiness percentage. */
  clouds: CloudData;
  /** Wind information. */
  wind: WindData;
  /** Snow information. */
  snow: SnowData;
  /** Rain information. */
  rain: RainData;
  /** Average visibility, metres. The maximum value of the visibility is 10km. */
  visibility: number;
  /** Probability of precipitation. The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%. */
  pop: number;
  /** Forecast date/time in ISO format (e.g., "2025-07-13 15:00:00") UTC. */
  dt_txt?: string;
  sys: {
    pod: PartOfDay;
  };
}

/**
 * Information about the city tied to the forecast.
 */
export interface ForecastCity {
  /** City ID. */
  id: number;
  /** City name. */
  name: string;
  /** Geographical coordinates. */
  coord: Coordinates;
  /** Country code (e.g., "GB"). */
  country: string;
  /** Shift in seconds from UTC. */
  timezone: number;
  /** Sunrise time (Unix, UTC). */
  sunrise: number;
  /** Sunset time (Unix, UTC). */
  sunset: number;
}

/**
 * Response from OpenWeatherMap's 5-day / 3-hour forecast API.
 */
export interface ForecastResponse {
  /** Internal parameter. Status code (should be "200"). */
  cod: string;
  /** Internal message code (usually 0 unless error). */
  message: number;
  /** Number of forecast items returned. */
  cnt: number;
  /** Array of forecasted data at 3-hour intervals. */
  list: ForecastItem[];
  /** Metadata about the city. */
  city: ForecastCity;
}
