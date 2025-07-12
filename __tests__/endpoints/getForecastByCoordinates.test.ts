import { getForecastByCoordinates } from '../../src/endpoints/getForecastByCoordinates';
import { BASE_OWM_API } from '../../src/constants';
import { ForecastResponse } from '../../src/types/ForecastResponse';

global.fetch = jest.fn();
const mockFetch = fetch as jest.Mock;

describe('getForecastByCoordinates', () => {
  const apiKey = 'test-api-key';
  const latitude = 40.7128;
  const longitude = -74.006;

  const mockResponse: ForecastResponse = {
    cod: '200',
    message: 0,
    cnt: 2,
    list: [
      {
        dt: 1628884800,
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
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d',
          },
        ],
        clouds: { all: 75 },
        wind: { speed: 3.6, deg: 250 },
        visibility: 10000,
        pop: 0.36,
        dt_txt: '2025-07-14 12:00:00',
      },
    ],
    city: {
      id: 5128581,
      name: 'New York',
      coord: { lat: latitude, lon: longitude },
      country: 'US',
      timezone: -14400,
      sunrise: 1628836860,
      sunset: 1628887560,
    },
  };

  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('constructs the correct URL with required parameters', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getForecastByCoordinates(latitude, longitude, apiKey);

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_OWM_API}/forecast?lat=40.7128&lon=-74.006&appid=${apiKey}&units=standard`
    );
  });

  it('includes units and language when provided', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getForecastByCoordinates(latitude, longitude, apiKey, undefined, {
      units: 'imperial',
      language: 'es',
    });

    const url = mockFetch.mock.calls[0][0];
    expect(url).toContain('units=imperial');
    expect(url).toContain('lang=es');
  });

  it('uses custom base URL', async () => {
    const customBaseUrl = 'https://custom.openweather.test';
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getForecastByCoordinates(latitude, longitude, apiKey, customBaseUrl);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining(customBaseUrl)
    );
  });

  it('returns the parsed forecast response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await getForecastByCoordinates(latitude, longitude, apiKey);
    expect(result).toEqual(mockResponse);
  });

  it('throws on non-OK response with JSON error body', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      text: () =>
        Promise.resolve(JSON.stringify({ message: 'Location not found' })),
    });

    await expect(getForecastByCoordinates(0, 0, apiKey)).rejects.toThrow(
      /Location not found/
    );
  });

  it('throws on non-OK response with plain text body', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Server Error',
      text: () => Promise.resolve('Unexpected server error'),
    });

    await expect(getForecastByCoordinates(0, 0, apiKey)).rejects.toThrow(
      /Unexpected server error/
    );
  });
});
