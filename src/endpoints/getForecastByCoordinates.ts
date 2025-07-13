import { BASE_OWM_API } from '../constants';
import { WeatherUnits } from '../types/shared/WeatherUnits';
import { ForecastResponse } from '../types/ForecastResponse';

/**
 * Options for fetching forecast by geographic coordinates.
 */
export interface GetForecastByCoordinatesOptions {
  /** Units of measurement. */
  units?: WeatherUnits;
  /** Language code (e.g., "en", "es", "fr"). */
  language?: string;
}

/**
 * Fetches 5-day / 3-hour forecast from OpenWeatherMap by geographic coordinates.
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @param {string} apiKey - Your OpenWeatherMap API key.
 * @param {string} [baseUrl] - Optional override for the base API URL.
 * @param {GetForecastByCoordinatesOptions} [options] - Optional query parameters.
 * @returns {Promise<ForecastResponse>} Forecast data for the given coordinates.
 * @throws {Error} If OpenWeatherMap API returns an error.
 */
export async function getForecastByCoordinates(
  latitude: number,
  longitude: number,
  apiKey: string,
  baseUrl = BASE_OWM_API,
  options: GetForecastByCoordinatesOptions = {}
): Promise<ForecastResponse> {
  const query = new URLSearchParams({
    lat: latitude.toString(),
    lon: longitude.toString(),
    appid: apiKey,
    units: options.units || 'standard',
  });

  if (options.language) {
    query.append('lang', options.language);
  }

  const url = `${baseUrl}/forecast?${query.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    let errorText = await res.text();
    try {
      const errorObject = JSON.parse(errorText);
      errorText = errorObject.message || errorText;
    } catch {
      // ignore JSON parse errors, use original errorText
    }
    throw new Error(
      `OpenWeatherMap error: ${res.status} ${res.statusText} - ${errorText}`
    );
  }

  return res.json();
}
