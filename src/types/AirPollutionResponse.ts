import { Coordinates } from './shared';

export enum AirQualityIndex {
  GOOD = 1,
  FAIR = 2,
  MODERATE = 3,
  POOR = 4,
  VERY_POOR = 5,
}

export interface AirQualityIndexData {
  /** The air quality index. A value 1 through 5. 1=Good, 2=Fair, 3=Moderate, 4=Poor, 5=Very Poor. */
  aqi: AirQualityIndex;
}

export interface AirQualityIndexEntry {
  /** Air quality index. */
  main: AirQualityIndexData;
  /** Chemical data for pollution factors. */
  components: AqiChemicalData;
  /** Date and time, Unix, UTC. */
  dt: number;
}

export interface AqiChemicalData {
  /** Concentration of CO (Carbon monoxide), μg/m3. */
  co: number;
  /** Concentration of NO (Nitrogen monoxide), μg/m3. */
  no: number;
  /** Concentration of NO2 (Nitrogen dioxide), μg/m3. */
  no2: number;
  /** Concentration of O3 (Ozone), μg/m3. */
  o3: number;
  /** Concentration of SO2 (Sulphur dioxide), μg/m3. */
  so2: number;
  /** Concentration of PM2.5 (Fine particles matter), μg/m3. */
  pm2_5: number;
  /** Concentration of PM10 (Coarse particulate matter), μg/m3. */
  pm10: number;
  /** Concentration of NH3 (Ammonia), μg/m3 */
  nh3: number;
}

export interface AirPollutionResponse {
  /** Coordinates from the specified location (latitude, longitude). */
  coord: Coordinates;
  /** List of current air quality index data. */
  list: AirQualityIndexEntry[];
}
