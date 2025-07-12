import { BASE_OWM_API } from './constants';
import {
  AirPollutionResponse,
  CurrentWeatherResponse,
  ForecastResponse,
} from './types';
import {
  getCurrentWeatherByCoordinates,
  GetCurrentWeatherByCoordinatesOptions,
  GetCurrentWeatherByCityOptions,
  getCurrentWeatherByCity,
  getForecastByCity,
  GetForecastByCityOptions,
  getForecastByCoordinates,
  GetForecastByCoordinatesOptions,
  getCurrentWeatherByZipCode,
  GetCurrentWeatherByZipCodeOptions,
  getCurrentAirPollutionByCoordinates,
  getCurrentAirPollutionByCoordinatesOptions,
} from './endpoints';

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

  getCurrentWeatherByCoordinates(
    latitude: number,
    longitude: number,
    options?: GetCurrentWeatherByCoordinatesOptions
  ): Promise<CurrentWeatherResponse>;

  getForecastByCity(
    city: string,
    options?: GetForecastByCityOptions
  ): Promise<ForecastResponse>;

  getForecastByCoordinates(
    latitude: number,
    longitude: number,
    options?: GetForecastByCoordinatesOptions
  ): Promise<ForecastResponse>;

  getCurrentWeatherByZipCode(
    zipCode: string | number,
    options?: GetCurrentWeatherByZipCodeOptions
  ): Promise<CurrentWeatherResponse>;

  getCurrentAirPollutionByCoordinates(
    options: getCurrentAirPollutionByCoordinatesOptions
  ): Promise<AirPollutionResponse>;
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
    getCurrentWeatherByCoordinates: (latitude, longitude, options) =>
      getCurrentWeatherByCoordinates(
        latitude,
        longitude,
        apiKey,
        baseUrl,
        options
      ),
    getForecastByCity: (city, options) =>
      getForecastByCity(city, apiKey, baseUrl, options),
    getForecastByCoordinates: (latitude, longitude, options) =>
      getForecastByCoordinates(latitude, longitude, apiKey, baseUrl, options),
    getCurrentWeatherByZipCode: (zipCode, options) =>
      getCurrentWeatherByZipCode(zipCode, apiKey, baseUrl, options),
    getCurrentAirPollutionByCoordinates: (options) =>
      getCurrentAirPollutionByCoordinates(options, apiKey, baseUrl),
  };
}
