export interface WeatherDescriptionData {
  /** Weather condition id. */
  id: number;
  /** Group of weather parameters (Rain, Snow, Clouds etc.). */
  main: string;
  /** Weather condition within the group. See https://openweathermap.org/weather-conditions for examples. */
  description: string;
  /** Weather icon id. */
  icon: string;
}
