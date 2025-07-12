import { BASE_OWM_API } from '../constants';
import {
  getCurrentWeatherByCity,
  GetCurrentWeatherByCityOptions,
} from '../endpoints/getCurrentWeatherByCity';
import { createOpenWeatherMapClient } from '../OpenWeatherMapClient';
import { CurrentWeatherResponse } from '../types/CurrentWeatherResponse';

jest.mock('../endpoints/getCurrentWeatherByCity', () => ({
  getCurrentWeatherByCity: jest.fn(),
}));

const mockedGetCurrentWeatherByCity =
  getCurrentWeatherByCity as jest.MockedFunction<
    typeof getCurrentWeatherByCity
  >;

describe('createOpenWeatherMapClient', () => {
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

  beforeEach(() => {
    mockedGetCurrentWeatherByCity.mockClear();
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

  it('forwards options to getCurrentWeatherByCity', async () => {
    const options: GetCurrentWeatherByCityOptions = { units: 'metric' };
    mockedGetCurrentWeatherByCity.mockResolvedValue(mockResponse);
    const client = createOpenWeatherMapClient({ apiKey: 'abc123' });
    await client.getCurrentWeatherByCity('Berlin', options);

    expect(mockedGetCurrentWeatherByCity).toHaveBeenCalledWith(
      'Berlin',
      'abc123',
      BASE_OWM_API,
      options
    );
  });

  it('returns the expected response from getCurrentWeatherByCity', async () => {
    mockedGetCurrentWeatherByCity.mockResolvedValue(mockResponse);
    const client = createOpenWeatherMapClient({ apiKey: 'key123' });
    const response = await client.getCurrentWeatherByCity('Tokyo');

    expect(response).toEqual(mockResponse);
  });

  it('exposes getCurrentWeatherByCity as a function', () => {
    const client = createOpenWeatherMapClient({ apiKey: 'some-key' });
    expect(typeof client.getCurrentWeatherByCity).toBe('function');
  });
});
