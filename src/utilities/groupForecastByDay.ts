import { ForecastItem } from '../types/ForecastResponse';

/**
 * Groups forecast items by calendar day (YYYY-MM-DD) to provide a more user-friendly forecast output.
 *
 * @param {ForecastItem[]} forecastList - The list of 3-hour forecast entries from OpenWeatherMap.
 * @returns {Record<string, ForecastItem[]>} An object with keys as date strings and values as arrays of ForecastItem.
 */
export function groupForecastByDay(
  forecastList: ForecastItem[]
): Record<string, ForecastItem[]> {
  return forecastList.reduce<Record<string, ForecastItem[]>>(
    (grouped, item) => {
      // Use dt_txt if available; fallback to timestamp
      const date: string =
        item.dt_txt?.split(' ')[0] ??
        new Date(item.dt * 1000).toISOString().split('T')[0];

      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);

      return grouped;
    },
    {}
  );
}
