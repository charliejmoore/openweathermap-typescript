import { BASE_OWM_API } from '../constants';
import { WeatherUnits, CurrentWeatherResponse } from '../types';

/**
 * Options for fetching current weather by ZIP/postal code.
 */
export interface GetCurrentWeatherByZipCodeOptions {
  /** Country code (e.g., "US", "GB"). Default is "US". */
  countryCode?: string;
  /** Units of measurement. */
  units?: WeatherUnits;
  /** Language for weather descriptions. */
  language?: string;
}

/**
 * Fetches current weather data by ZIP or postal code.
 * @param {string | number} zipCode - ZIP or postal code.
 * @param {string} apiKey - Your OpenWeatherMap API key.
 * @param {string} [baseUrl] - Optional base URL override.
 * @param {GetWeatherByZipCodeOptions} [options] - Optional query parameters.
 * @returns {Promise<CurrentWeatherResponse>} The current weather for the given ZIP code.
 * @throws {Error} If the API response is not OK.
 */
export async function getCurrentWeatherByZipCode(
  zipCode: string | number,
  apiKey: string,
  baseUrl = BASE_OWM_API,
  options: GetCurrentWeatherByZipCodeOptions = {}
): Promise<CurrentWeatherResponse> {
  const zipParam = `${zipCode},${options.countryCode || 'US'}`;

  const params = new URLSearchParams({
    zip: zipParam,
    appid: apiKey,
    units: options.units || 'standard',
  });

  if (options.language) {
    params.append('lang', options.language);
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
