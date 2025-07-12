import { CloudData } from './shared/CloudData';
import { Coordinates } from './shared/Coordinates';
import { WeatherDescriptionData } from './shared/WeatherDescriptionData';
import { WeatherMetricsData } from './shared/WeatherMetricsData';
import { WindData } from './shared/WindData';

/**
 * Represents a single forecast time slot (e.g., every 3 hours).
 */
export interface ForecastItem {
  /** Time of data forecasted, Unix, UTC */
  dt: number;
  /** Main weather parameters */
  main: WeatherMetricsData;

  /** Array of weather condition info (usually one item) */
  weather: WeatherDescriptionData[];

  /** Cloudiness percentage */
  clouds: CloudData;

  /** Wind information */
  wind: WindData;

  /** Average visibility in meters */
  visibility: number;

  /** Probability of precipitation (0.0–1.0) */
  pop: number;

  /** Forecast date/time in ISO format (e.g., "2025-07-13 15:00:00") */
  dt_txt: string;
}

/**
 * Information about the city tied to the forecast.
 */
export interface ForecastCity {
  /** City ID */
  id: number;

  /** City name */
  name: string;

  /** Geographical coordinates */
  coord: Coordinates;

  /** Country code (e.g., "GB") */
  country: string;

  /** Shift in seconds from UTC */
  timezone: number;

  /** Sunrise time (Unix, UTC) */
  sunrise: number;

  /** Sunset time (Unix, UTC) */
  sunset: number;
}

/**
 * Response from OpenWeatherMap's 5-day / 3-hour forecast API.
 */
export interface ForecastResponse {
  /** Status code (should be "200") */
  cod: string;

  /** Internal message code (usually 0 unless error) */
  message: number;

  /** Number of forecast items returned */
  cnt: number;

  /** Array of forecasted data at 3-hour intervals */
  list: ForecastItem[];

  /** Metadata about the city */
  city: ForecastCity;
}
