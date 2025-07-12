export interface Coordinates {
  /** Longitude of the location. */
  lon: number;
  /** Latitude of the location. */
  lat: number;
}

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

export interface WindData {
  /** Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour. */
  speed: number;
  /** Wind direction, degrees (meteorological). */
  deg: number;
  /** Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour. */
  gust: number;
}

export interface CloudData {
  /** Cloudiness, %. */
  all: number;
}

export interface SysData {
  /** Country code (GB, JP etc.). */
  country: string;
  /** Sunrise time, unix, UTC. */
  sunrise: number;
  /** Sunset time, unix, UTC. */
  sunset: number;
}

export interface CurrentWeatherResponse {
  /** Coordinates of weather location. */
  coord: Coordinates;
  /** Essential weather information including description (e.g., 'Cloudy'), etc. */
  weather: WeatherDescriptionData[];
  /** Internal parameter. */
  base: string;
  /** Main weather metrics including temperature, humidity, pressure, etc.. */
  main: WeatherMetricsData;
  /** Visibility, meter. The maximum value of the visibility is 10 km. */
  visibility: number;
  /** Wind speed, gust, direction. */
  wind: WindData;
  /** Cloud data. */
  clouds: CloudData;
  /** Time of data calculation, unix, UTC. */
  dt: number;
  /** Includes sunrise and sunset time data. */
  sys: SysData;
  /** Shift in seconds from UTC. */
  timezone: number;
  /** City id. */
  id: number;
  /** City name. */
  name: string;
  /** Internal parameter. */
  cod: number;
}
