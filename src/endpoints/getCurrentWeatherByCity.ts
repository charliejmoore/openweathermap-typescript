import { BASE_OWM_API } from '../constants';
import { CurrentWeatherResponse } from '../types/CurrentWeatherResponse';
import { WeatherUnits } from '../types/WeatherUnits';

/**
 * Options for fetching current weather by city.
 */
export interface GetCurrentWeatherByCityOptions {
  /** Country code. See https://www.iso.org/obp/ui/#search for available country codes. */
  country?: string;
  /** Units of measurement. */
  units?: WeatherUnits;
  /** You can use this parameter to get the output in your language. */
  lang?: string;
}

/**
 * Fetches current weather data from OpenWeatherMap by city name.
 * @param {string} city - City name (e.g., "London").
 * @param {string} apiKey - Your OpenWeatherMap API key.
 * @param {string} baseUrl - (Optional) API base URL (default: v2.5 endpoint)
 * @param {GetCurrentWeatherByCityOptions} options - (Optional) units, language, country code
 * @param {string} [options.country] - (Optional)
 * @param {WeatherUnits} [options.units] - (Optional) Units of measurement (default: 'standard').
 * @param {string} [options.lang] - (Optional) You can use this parameter to get the output in your language.
 * @throws {Error} If OpenWeatherMap API returns an error response.
 * @returns {WeatherResponse} The weather for the given city.
 */
export async function getCurrentWeatherByCity(
  city: string,
  apiKey: string,
  baseUrl = BASE_OWM_API,
  options: GetCurrentWeatherByCityOptions = {}
): Promise<CurrentWeatherResponse> {
  let q: string = city;
  if (options.country) {
    q += `,${options.country}`;
  }

  const params = new URLSearchParams({
    q,
    appid: apiKey,
    units: options.units || 'standard',
  });
  if (options.lang) params.append('lang', options.lang);

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
