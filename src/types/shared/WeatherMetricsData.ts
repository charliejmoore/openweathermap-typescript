export interface WeatherMetricsData {
  /** Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit. */
  temp: number;
  /** Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit. */
  feels_like: number;
  /** Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas). More info here: https://openweathermap.org/current#min. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit. */
  temp_min: number;
  /** Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas). More info here: https://openweathermap.org/current#min. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit. */
  temp_max: number;
  /** Atmospheric pressure on the sea level, hPa. */
  pressure: number;
  /** Humidity, %. */
  humidity: number;
  /** Atmospheric pressure on the sea level, hPa. */
  sea_level: number;
  /** Atmospheric pressure on the ground level, hPa. */
  grnd_level: number;
}
