import { BASE_OWM_API } from '../constants';
import { AirPollutionResponse } from '../types/AirPollutionResponse';

/**
 * Fetches air pollution data by geographic coordinates.
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @param {string} apiKey - Your OpenWeatherMap API key.
 * @param {string} [baseUrl] - Optional override for the OpenWeatherMap API base URL.
 * @returns {Promise<AirPollutionResponse>} The air quality data at the given location.
 * @throws {Error} If OpenWeatherMap API returns an error response.
 */
export async function getCurrentAirPollutionByCoordinates(
  latitude: number,
  longitude: number,
  apiKey: string,
  baseUrl = BASE_OWM_API
): Promise<AirPollutionResponse> {
  const query = new URLSearchParams({
    lat: latitude.toString(),
    lon: longitude.toString(),
    appid: apiKey,
  });

  const url = `${baseUrl}/air_pollution?${query.toString()}`;
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
