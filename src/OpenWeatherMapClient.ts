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
} from './endpoints';

export interface CreateOpenWeatherMapClientConfig {
  /** Your OpenWeatherMap API key. */
  apiKey: string;
  /** Override API base URL (for testing, etc.) */
  baseUrl?: string;
}

/**
 * Interface for interacting with OpenWeatherMap API endpoints.
 */
export interface OpenWeatherMapClient {
  /**
   * Fetches current weather data for a given city name.
   *
   * @param {string} city - The name of the city (e.g., "London").
   * @param {GetCurrentWeatherByCityOptions} [options] - Optional query parameters such as units, language, or country code.
   * @returns {Promise<CurrentWeatherResponse>} A promise resolving to current weather data for the specified city.
   */
  getCurrentWeatherByCity(
    city: string,
    options?: GetCurrentWeatherByCityOptions
  ): Promise<CurrentWeatherResponse>;

  /**
   * Fetches current weather data by geographic coordinates.
   *
   * @param {number} latitude - The latitude of the location.
   * @param {number} longitude - The longitude of the location.
   * @param {GetCurrentWeatherByCoordinatesOptions} [options] - Optional query parameters such as units or language.
   * @returns {Promise<CurrentWeatherResponse>} A promise resolving to current weather data for the specified coordinates.
   */
  getCurrentWeatherByCoordinates(
    latitude: number,
    longitude: number,
    options?: GetCurrentWeatherByCoordinatesOptions
  ): Promise<CurrentWeatherResponse>;

  /**
   * Fetches 5-day weather forecast by city name.
   *
   * @param {string} city - The name of the city (e.g., "Paris").
   * @param {GetForecastByCityOptions} [options] - Optional query parameters such as units, language, or country code.
   * @returns {Promise<ForecastResponse>} A promise resolving to 5-day forecast data for the specified city.
   */
  getForecastByCity(
    city: string,
    options?: GetForecastByCityOptions
  ): Promise<ForecastResponse>;

  /**
   * Fetches 5-day weather forecast by geographic coordinates.
   *
   * @param {number} latitude - The latitude of the location.
   * @param {number} longitude - The longitude of the location.
   * @param {GetForecastByCoordinatesOptions} [options] - Optional query parameters such as units or language.
   * @returns {Promise<ForecastResponse>} A promise resolving to 5-day forecast data for the specified coordinates.
   */
  getForecastByCoordinates(
    latitude: number,
    longitude: number,
    options?: GetForecastByCoordinatesOptions
  ): Promise<ForecastResponse>;

  /**
   * Fetches current weather data by ZIP/postal code.
   *
   * @param {string | number} zipCode - The ZIP or postal code (e.g., "90210").
   * @param {GetCurrentWeatherByZipCodeOptions} [options] - Optional query parameters including country code, units, or language.
   * @returns {Promise<CurrentWeatherResponse>} A promise resolving to current weather data for the specified ZIP code.
   */
  getCurrentWeatherByZipCode(
    zipCode: string | number,
    options?: GetCurrentWeatherByZipCodeOptions
  ): Promise<CurrentWeatherResponse>;

  /**
   * Fetches current air pollution data for a geographic location.
   *
   * @param {number} latitude - The latitude of the location.
   * @param {number} longitude - The longitude of the location.
   * @returns {Promise<AirPollutionResponse>} A promise resolving to current air pollution data.
   */
  getCurrentAirPollutionByCoordinates(
    latitude: number,
    longitude: number
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
  if (!apiKey) {
    throw new Error('API key is required');
  }
  baseUrl = baseUrl || BASE_OWM_API;

  return {
    /** Current Weather */
    getCurrentWeatherByCity: (city, options) =>
      getCurrentWeatherByCity(city, apiKey, baseUrl, options),
    getCurrentWeatherByZipCode: (zipCode, options) =>
      getCurrentWeatherByZipCode(zipCode, apiKey, baseUrl, options),
    getCurrentWeatherByCoordinates: (latitude, longitude, options) =>
      getCurrentWeatherByCoordinates(
        latitude,
        longitude,
        apiKey,
        baseUrl,
        options
      ),
    /** Air Pollution */
    getCurrentAirPollutionByCoordinates: (latitude, longitude) =>
      getCurrentAirPollutionByCoordinates(latitude, longitude, apiKey, baseUrl),
    /** Forecast */
    getForecastByCity: (city, options) =>
      getForecastByCity(city, apiKey, baseUrl, options),
    getForecastByCoordinates: (latitude, longitude, options) =>
      getForecastByCoordinates(latitude, longitude, apiKey, baseUrl, options),
  };
}
