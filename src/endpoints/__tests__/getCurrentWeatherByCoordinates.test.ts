import { BASE_OWM_API } from '../../constants';
import { CurrentWeatherResponse } from '../../types';
import { getCurrentWeatherByCoordinates } from '../getCurrentWeatherByCoordinates';

global.fetch = jest.fn();
const mockFetch = fetch as jest.Mock;

describe('getCurrentWeatherByCoordinates', () => {
  const apiKey = 'test-api-key';
  const lat = 51.5074;
  const lon = -0.1278;

  const mockResponse: CurrentWeatherResponse = {
    coord: { lon, lat },
    weather: [],
    base: 'stations',
    main: {
      temp: 280,
      feels_like: 278,
      temp_min: 278,
      temp_max: 282,
      pressure: 1012,
      humidity: 80,
      sea_level: 0,
      grnd_level: 0,
    },
    visibility: 10000,
    wind: {
      speed: 1.5,
      deg: 0,
      gust: 0,
    },
    clouds: { all: 20 },
    dt: 1234567890,
    sys: {
      country: 'GB',
      sunrise: 123456789,
      sunset: 123456999,
    },
    timezone: 0,
    id: 123456,
    name: 'London',
    cod: 200,
  };

  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('constructs correct URL with required params', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getCurrentWeatherByCoordinates(lat, lon, apiKey);

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_OWM_API}/weather?lat=51.5074&lon=-0.1278&appid=${apiKey}&units=standard`
    );
  });

  it('includes units and lang when provided', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getCurrentWeatherByCoordinates(lat, lon, apiKey, undefined, {
      units: 'metric',
      lang: 'es',
    });

    const calledUrl = mockFetch.mock.calls[0][0];
    expect(calledUrl).toContain('units=metric');
    expect(calledUrl).toContain('lang=es');
  });

  it('uses custom base URL', async () => {
    const customUrl = 'https://custom.api';
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getCurrentWeatherByCoordinates(lat, lon, apiKey, customUrl);

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining(customUrl));
  });

  it('returns the parsed response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await getCurrentWeatherByCoordinates(lat, lon, apiKey);
    expect(result).toEqual(mockResponse);
  });

  it('throws error on non-OK response with JSON body', async () => {
    const errorBody = { message: 'Invalid coordinates' };
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      text: () => Promise.resolve(JSON.stringify(errorBody)),
    });

    await expect(getCurrentWeatherByCoordinates(0, 0, apiKey)).rejects.toThrow(
      /Invalid coordinates/
    );
  });

  it('throws error on non-OK response with plain text body', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      text: () => Promise.resolve('Oops'),
    });

    await expect(getCurrentWeatherByCoordinates(0, 0, apiKey)).rejects.toThrow(
      /Oops/
    );
  });
});
