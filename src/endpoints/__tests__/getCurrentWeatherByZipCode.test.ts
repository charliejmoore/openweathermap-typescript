import { getCurrentWeatherByZipCode } from '../getCurrentWeatherByZipCode';
import { BASE_OWM_API } from '../../constants';
import { CurrentWeatherResponse } from '../../types/CurrentWeatherResponse';

global.fetch = jest.fn();
const mockFetch = fetch as jest.Mock;

describe('getCurrentWeatherByZipCode', () => {
  const apiKey = 'test-api-key';
  const mockResponse: CurrentWeatherResponse = {
    coord: { lon: -74.006, lat: 40.7128 },
    weather: [],
    base: 'stations',
    main: {
      temp: 295.37,
      feels_like: 295.95,
      temp_min: 294.26,
      temp_max: 296.48,
      pressure: 1013,
      humidity: 83,
      sea_level: 0,
      grnd_level: 0,
    },
    visibility: 10000,
    wind: { speed: 3.6, deg: 250 },
    clouds: { all: 75 },
    dt: 1628884800,
    sys: {
      country: 'US',
      sunrise: 1628836860,
      sunset: 1628887560,
    },
    timezone: -14400,
    id: 5128581,
    name: 'New York',
    cod: 200,
  };

  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('builds correct URL with default options', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getCurrentWeatherByZipCode(10001, apiKey);

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_OWM_API}/weather?zip=10001%2CUS&appid=${apiKey}&units=standard`
    );
  });

  it('includes country code when provided', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getCurrentWeatherByZipCode('90210', apiKey, undefined, {
      countryCode: 'CA',
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('zip=90210%2CCA')
    );
  });

  it('includes units and language when provided', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getCurrentWeatherByZipCode(94110, apiKey, undefined, {
      units: 'imperial',
      language: 'es',
    });

    const url = mockFetch.mock.calls[0][0];
    expect(url).toContain('units=imperial');
    expect(url).toContain('lang=es');
  });

  it('uses custom base URL', async () => {
    const customUrl = 'https://custom.openweather.test';
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getCurrentWeatherByZipCode('30301', apiKey, customUrl);

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining(customUrl));
  });

  it('returns the parsed response on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await getCurrentWeatherByZipCode('10001', apiKey);
    expect(result).toEqual(mockResponse);
  });

  it('throws error on non-OK response with JSON body', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      text: () => Promise.resolve(JSON.stringify({ message: 'Invalid ZIP' })),
    });

    await expect(getCurrentWeatherByZipCode('00000', apiKey)).rejects.toThrow(
      /Invalid ZIP/
    );
  });

  it('throws error on non-OK response with plain text', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Server Error',
      text: () => Promise.resolve('Unexpected failure'),
    });

    await expect(getCurrentWeatherByZipCode('12345', apiKey)).rejects.toThrow(
      /Unexpected failure/
    );
  });
});
