import { BASE_OWM_API } from '../constants';
import { getCurrentWeatherByCity } from '../endpoints/getCurrentWeatherByCity';
import { getForecastByCity } from '../endpoints/getForecastByCity';
import { getForecastByCoordinates } from '../endpoints/getForecastByCoordinates';
import { getCurrentWeatherByCoordinates } from '../endpoints/getCurrentWeatherByCoordinates';
import { getCurrentWeatherByZipCode } from '../endpoints/getCurrentWeatherByZipCode';
import { getCurrentAirPollutionByCoordinates } from '../endpoints/getCurrentAirPollutionByCoordinates';
import { createOpenWeatherMapClient } from '../OpenWeatherMapClient';
import { CurrentWeatherResponse } from '../types/api-responses/CurrentWeatherResponse';

jest.mock('../endpoints/getCurrentWeatherByCity', () => ({
  getCurrentWeatherByCity: jest.fn(),
}));
jest.mock('../endpoints/getForecastByCity', () => ({
  getForecastByCity: jest.fn(),
}));
jest.mock('../endpoints/getForecastByCoordinates', () => ({
  getForecastByCoordinates: jest.fn(),
}));
jest.mock('../endpoints/getCurrentWeatherByCoordinates', () => ({
  getCurrentWeatherByCoordinates: jest.fn(),
}));
jest.mock('../endpoints/getCurrentWeatherByZipCode', () => ({
  getCurrentWeatherByZipCode: jest.fn(),
}));
jest.mock('../endpoints/getCurrentAirPollutionByCoordinates', () => ({
  getCurrentAirPollutionByCoordinates: jest.fn(),
}));

const mockedGetCurrentWeatherByCity =
  getCurrentWeatherByCity as jest.MockedFunction<
    typeof getCurrentWeatherByCity
  >;
const mockedGetForecastByCity = getForecastByCity as jest.MockedFunction<
  typeof getForecastByCity
>;
const mockedGetForecastByCoordinates =
  getForecastByCoordinates as jest.MockedFunction<
    typeof getForecastByCoordinates
  >;
const mockedGetCurrentWeatherByCoordinates =
  getCurrentWeatherByCoordinates as jest.MockedFunction<
    typeof getCurrentWeatherByCoordinates
  >;
const mockedGetWeatherByZipCode =
  getCurrentWeatherByZipCode as jest.MockedFunction<
    typeof getCurrentWeatherByZipCode
  >;
const mockedGetAirPollutionByCoordinates =
  getCurrentAirPollutionByCoordinates as jest.MockedFunction<
    typeof getCurrentAirPollutionByCoordinates
  >;

const mockResponse: CurrentWeatherResponse = {
  coord: { lon: 10, lat: 20 },
  weather: [],
  base: 'stations',
  main: {
    temp: 298.77,
    feels_like: 298.59,
    temp_min: 297.59,
    temp_max: 300.37,
    pressure: 1013,
    humidity: 65,
    sea_level: 0,
    grnd_level: 0,
  },
  visibility: 10000,
  wind: {
    speed: 1.5,
    deg: 350,
    gust: 0,
  },
  clouds: { all: 1 },
  dt: 1605182400,
  sys: {
    country: 'US',
    sunrise: 1605164117,
    sunset: 1605201815,
  },
  timezone: -28800,
  id: 420006353,
  name: 'Test City',
  cod: 200,
};

describe('createOpenWeatherMapClient', () => {
  beforeEach(() => {
    mockedGetCurrentWeatherByCity.mockClear();
    mockedGetForecastByCity.mockClear();
    mockedGetForecastByCoordinates.mockClear();
    mockedGetCurrentWeatherByCoordinates.mockClear();
    mockedGetWeatherByZipCode.mockClear();
    mockedGetAirPollutionByCoordinates.mockClear();
  });

  it('throws an error if apiKey is missing', () => {
    expect(() => createOpenWeatherMapClient({ apiKey: '' })).toThrow(
      'API key is required'
    );
  });

  it('uses BASE_OWM_API as default baseUrl if not provided', async () => {
    mockedGetCurrentWeatherByCity.mockResolvedValue(mockResponse);
    const client = createOpenWeatherMapClient({ apiKey: 'test-key' });
    await client.getCurrentWeatherByCity('London');

    expect(mockedGetCurrentWeatherByCity).toHaveBeenCalledWith(
      'London',
      'test-key',
      BASE_OWM_API,
      undefined
    );
  });

  it('uses custom baseUrl when provided', async () => {
    const customBaseUrl = 'https://custom.api.url';
    mockedGetCurrentWeatherByCity.mockResolvedValue(mockResponse);
    const client = createOpenWeatherMapClient({
      apiKey: 'test-key',
      baseUrl: customBaseUrl,
    });
    await client.getCurrentWeatherByCity('Paris');

    expect(mockedGetCurrentWeatherByCity).toHaveBeenCalledWith(
      'Paris',
      'test-key',
      customBaseUrl,
      undefined
    );
  });

  it('calls all endpoints with correct arguments', async () => {
    const client = createOpenWeatherMapClient({ apiKey: 'abc123' });

    await client.getCurrentWeatherByCity('Berlin');
    await client.getForecastByCity('London', { units: 'metric' });
    await client.getForecastByCoordinates(51.5, -0.1, { units: 'imperial' });
    await client.getCurrentWeatherByCoordinates(40.7, -74);
    await client.getCurrentWeatherByZipCode('90210', { countryCode: 'US' });
    await client.getCurrentAirPollutionByCoordinates(35, 139);

    expect(mockedGetCurrentWeatherByCity).toHaveBeenCalledWith(
      'Berlin',
      'abc123',
      BASE_OWM_API,
      undefined
    );
    expect(mockedGetForecastByCity).toHaveBeenCalledWith(
      'London',
      'abc123',
      BASE_OWM_API,
      { units: 'metric' }
    );
    expect(mockedGetForecastByCoordinates).toHaveBeenCalledWith(
      51.5,
      -0.1,
      'abc123',
      BASE_OWM_API,
      { units: 'imperial' }
    );
    expect(mockedGetCurrentWeatherByCoordinates).toHaveBeenCalledWith(
      40.7,
      -74,
      'abc123',
      BASE_OWM_API,
      undefined
    );
    expect(mockedGetWeatherByZipCode).toHaveBeenCalledWith(
      '90210',
      'abc123',
      BASE_OWM_API,
      { countryCode: 'US' }
    );
    expect(mockedGetAirPollutionByCoordinates).toHaveBeenCalledWith(
      35,
      139,
      'abc123',
      BASE_OWM_API
    );
  });
});
