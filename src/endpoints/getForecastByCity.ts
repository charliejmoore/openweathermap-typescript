import { BASE_OWM_API } from '../constants';
import { ForecastResponse } from '../types/ForecastResponse';
import { WeatherUnits } from '../types/shared/WeatherUnits';

/**
 * Options for fetching forecast by city.
 */
export interface GetForecastByCityOptions {
  /** Country code. (e.g. "GB") */
  country?: string;
  /** Units of measurement. */
  units?: WeatherUnits;
  /** Language code (e.g. "en", "es", "fr"). */
  lang?: string;
}

/**
 * Fetches 5-day / 3-hour forecast from OpenWeatherMap by city name.
 * @param {string} city - City name (e.g., "London").
 * @param {string} apiKey - Your OpenWeatherMap API key.
 * @param {string} [baseUrl] - (Optional) API base URL (default: v2.5 endpoint).
 * @param {GetForecastByCityOptions} [options] - Optional parameters (country, units, lang).
 * @returns {Promise<ForecastResponse>} Forecast data.
 * @throws {Error} If OpenWeatherMap API returns an error.
 */
export async function getForecastByCity(
  city: string,
  apiKey: string,
  baseUrl = BASE_OWM_API,
  options: GetForecastByCityOptions = {}
): Promise<ForecastResponse> {
  let q = city;
  if (options.country) {
    q += `,${options.country}`;
  }

  const params = new URLSearchParams({
    q,
    appid: apiKey,
    units: options.units || 'standard',
  });

  if (options.lang) {
    params.append('lang', options.lang);
  }

  const url = `${baseUrl}/forecast?${params.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    let errorText = await res.text();
    try {
      const errorObj = JSON.parse(errorText);
      errorText = errorObj.message || errorText;
    } catch {
      // ignore JSON parse errors, use original errorText
    }
    throw new Error(
      `OpenWeatherMap error: ${res.status} ${res.statusText} - ${errorText}`
    );
  }

  return res.json();
}
