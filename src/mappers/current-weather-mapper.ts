import { CurrentWeatherResponse } from '../types';
import { CurrentWeather } from '../types/normalized';

/**
 * Returns a simplified version of OpenWeatherMap's CurrentWeatherResponse
 * using TypeScript naming conventions.
 *
 * @param {CurrentWeatherResponse} currentWeatherResponse
 * @return {CurrentWeather}
 */
export const currentWeatherMapper = (
  currentWeatherResponse: CurrentWeatherResponse
): CurrentWeather => {
  return {
    cityName: currentWeatherResponse?.name ?? '',
    countryCode: currentWeatherResponse?.sys?.country ?? '',
    temperature: currentWeatherResponse?.main?.temp,
    feelsLike: currentWeatherResponse?.main?.feels_like,
    humidity: currentWeatherResponse?.main?.humidity,
    pressure: currentWeatherResponse?.main?.pressure,
    weather: currentWeatherResponse?.weather,
    windSpeed: currentWeatherResponse?.wind?.speed,
    windDirection: currentWeatherResponse?.wind?.deg,
    windGust: currentWeatherResponse?.wind?.gust,
    sunrise: currentWeatherResponse?.sys?.sunrise,
    sunset: currentWeatherResponse?.sys?.sunset,
    timestamp: currentWeatherResponse?.dt,
    timezone: currentWeatherResponse?.timezone,
    coordinates: currentWeatherResponse?.coord,
    cloudiness: currentWeatherResponse?.clouds?.all,
  };
};
