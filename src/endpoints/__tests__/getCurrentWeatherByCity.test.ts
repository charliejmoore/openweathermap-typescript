import { BASE_OWM_API } from '../../constants';
import { CurrentWeatherResponse } from '../../types';
import { getCurrentWeatherByCity } from '../getCurrentWeatherByCity';

global.fetch = jest.fn();

const mockFetch = fetch as jest.Mock;

describe('getCurrentWeatherByCity', () => {
  const apiKey = 'test-api-key';

  const mockResponse: CurrentWeatherResponse = {
    coord: { lon: 0, lat: 0 },
    weather: [],
    base: 'stations',
    main: {
      temp: 280,
      feels_like: 279,
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
    name: 'Test City',
    cod: 200,
  };

  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('constructs the correct URL with default options', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getCurrentWeatherByCity('London', apiKey);

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_OWM_API}/weather?q=London&appid=${apiKey}&units=standard`
    );
  });

  it('includes country code when provided', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getCurrentWeatherByCity('Paris', apiKey, undefined, {
      country: 'FR',
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('q=Paris%2CFR')
    );
  });

  it('includes units and lang when provided', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getCurrentWeatherByCity('Berlin', apiKey, undefined, {
      units: 'metric',
      lang: 'de',
    });

    const calledUrl = mockFetch.mock.calls[0][0];
    expect(calledUrl).toContain('units=metric');
    expect(calledUrl).toContain('lang=de');
  });

  it('uses custom base URL when provided', async () => {
    const customBaseUrl = 'https://custom.api';
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getCurrentWeatherByCity('Tokyo', apiKey, customBaseUrl);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining(`${customBaseUrl}/weather`)
    );
  });

  it('returns parsed JSON response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await getCurrentWeatherByCity('New York', apiKey);

    expect(result).toEqual(mockResponse);
  });

  it('throws error on non-OK response with JSON error body', async () => {
    const errorBody = { message: 'City not found' };
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      text: () => Promise.resolve(JSON.stringify(errorBody)),
    });

    await expect(getCurrentWeatherByCity('FakeCity', apiKey)).rejects.toThrow(
      /City not found/
    );
  });

  it('throws error on non-OK response with plain text body', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      text: () => Promise.resolve('Server exploded'),
    });

    await expect(getCurrentWeatherByCity('OopsCity', apiKey)).rejects.toThrow(
      /Server exploded/
    );
  });
});
