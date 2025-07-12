import { BASE_OWM_API } from './constants';
import {
  getCurrentWeatherByCity,
  GetCurrentWeatherByCityOptions,
} from './endpoints/getCurrentWeatherByCity';
import { CurrentWeatherResponse } from './types/CurrentWeatherResponse';

export interface CreateOpenWeatherMapClientConfig {
  /** Your OpenWeatherMap API key. */
  apiKey: string;
  /** Override API base URL (for testing, etc.) */
  baseUrl?: string;
}

export interface OpenWeatherMapClient {
  getCurrentWeatherByCity(
    city: string,
    options?: GetCurrentWeatherByCityOptions
  ): Promise<CurrentWeatherResponse>;
}

/**
 * Factory function OpenWeatherMap API client
 *
 * @param {CreateOpenWeatherMapClientConfig} config - Configuration object.
 * @param {string} config.apiKey - Your OpenWeatherMap API key.
 * @param {string} [config.baseUrl] - (Optional) Override API base URL (for testing, etc.).
 * @throws {Error} If the API key is missing.
 * @return {OpenWeatherMapClient} The API client instance.
 */
export function createOpenWeatherMapClient({
  apiKey,
  baseUrl,
}: CreateOpenWeatherMapClientConfig): OpenWeatherMapClient {
  if (!apiKey) throw new Error('API key is required');
  baseUrl = baseUrl || BASE_OWM_API;

  return {
    getCurrentWeatherByCity: (city, options) =>
      getCurrentWeatherByCity(city, apiKey, baseUrl, options),
  };
}
