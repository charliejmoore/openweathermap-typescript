import { Coordinates, WeatherDescriptionData } from '../shared';

/**
 * A simplified version of OpenWeatherMap's CurrentWeatherResponse,
 * suitable for easy rendering in UIs or downstream processing.
 * Uses TypeScript conventions such as camelCase.
 */
export interface CurrentWeather {
  /** Name of the city (e.g., "London"). */
  cityName: string;
  /** ISO 3166 country code (e.g., "GB" for United Kingdom). */
  countryCode: string;
  /** Temperature in the requested units (Kelvin, Celsius, or Fahrenheit). */
  temperature?: number;
  /** Perceived temperature, taking humidity and wind into account. */
  feelsLike?: number;
  /** Relative humidity, in percent. */
  humidity?: number;
  /** Atmospheric pressure at sea level, in hPa. */
  pressure?: number;
  /** Essential weather information including description (e.g., 'Cloudy'), etc. */
  weather: WeatherDescriptionData[];
  /** Wind speed, in meters per second by default. */
  windSpeed?: number;
  /** Wind direction, in degrees (0 = North, 90 = East, etc.). */
  windDirection?: number;
  /** Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour. */
  windGust?: number;
  /** Sunrise time, as a UNIX UTC timestamp. */
  sunrise?: number;
  /** Sunset time, as a UNIX UTC timestamp. */
  sunset?: number;
  /** Current observation timestamp, as a UNIX UTC timestamp. */
  timestamp?: number;
  /** Shift in seconds from UTC. */
  timezone?: number;
  /** Coordinates of weather location. */
  coordinates: Coordinates;
  /** Cloudiness, %. */
  cloudiness?: number;
}
