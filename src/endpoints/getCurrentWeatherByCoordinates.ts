import { BASE_OWM_API } from '../constants';
import { CurrentWeatherResponse } from '../types/CurrentWeatherResponse';
import { WeatherUnits } from '../types/shared/WeatherUnits';

/**
 * Options for fetching current weather by geographic coordinates.
 */
export interface GetCurrentWeatherByCoordinatesOptions {
  /** Units of measurement. */
  units?: WeatherUnits;
  /** You can use this parameter to get the output in your language. */
  lang?: string;
}

/**
 * Fetches current weather data from OpenWeatherMap by geographic coordinates.
 * @param {number} latitude - Latitude.
 * @param {number} longitude - Longitude.
 * @param {string} apiKey - Your OpenWeatherMap API key.
 * @param {string} [baseUrl] - (Optional) API base URL (default: v2.5 endpoint)
 * @param {GetCurrentWeatherByCoordinatesOptions} [options] - Optional parameters (units, language).
 * @throws {Error} If OpenWeatherMap API returns an error response.
 * @returns {Promise<CurrentWeatherResponse>} The weather for the given coordinates.
 */
export async function getCurrentWeatherByCoordinates(
  latitude: number,
  longitude: number,
  apiKey: string,
  baseUrl = BASE_OWM_API,
  options: GetCurrentWeatherByCoordinatesOptions = {}
): Promise<CurrentWeatherResponse> {
  const params = new URLSearchParams({
    lat: latitude.toString(),
    lon: longitude.toString(),
    appid: apiKey,
    units: options.units || 'standard',
  });

  if (options.lang) {
    params.append('lang', options.lang);
  }

  const url = `${baseUrl}/weather?${params.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    let errorText = await res.text();
    try {
      const errorObj = JSON.parse(errorText);
      errorText = errorObj.message || errorText;
    } catch {}
    throw new Error(
      `OpenWeatherMap error: ${res.status} ${res.statusText} - ${errorText}`
    );
  }

  return res.json();
}
