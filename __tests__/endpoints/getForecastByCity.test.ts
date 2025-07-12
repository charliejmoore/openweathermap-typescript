import { getForecastByCity } from '../../src/endpoints/getForecastByCity';
import { BASE_OWM_API } from '../../src/constants';
import { ForecastResponse } from '../../src/types/ForecastResponse';

global.fetch = jest.fn();
const mockFetch = fetch as jest.Mock;

describe('getForecastByCity', () => {
  const apiKey = 'test-api-key';

  const mockResponse: ForecastResponse = {
    cod: '200',
    message: 0,
    cnt: 2,
    list: [
      {
        dt: 1234567890,
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
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
        clouds: { all: 0 },
        wind: { speed: 1.5, deg: 90 },
        visibility: 10000,
        pop: 0,
        dt_txt: '2025-07-13 15:00:00',
      },
    ],
    city: {
      id: 2643743,
      name: 'London',
      coord: { lat: 51.5074, lon: -0.1278 },
      country: 'GB',
      timezone: 0,
      sunrise: 123456789,
      sunset: 123456999,
    },
  };

  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('constructs the correct URL with default options', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getForecastByCity('London', apiKey);

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_OWM_API}/forecast?q=London&appid=${apiKey}&units=standard`
    );
  });

  it('includes country code when provided', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getForecastByCity('Paris', apiKey, undefined, { country: 'FR' });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('q=Paris%2CFR')
    );
  });

  it('includes units and lang when provided', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getForecastByCity('Berlin', apiKey, undefined, {
      units: 'metric',
      lang: 'de',
    });

    const calledUrl = mockFetch.mock.calls[0][0];
    expect(calledUrl).toContain('units=metric');
    expect(calledUrl).toContain('lang=de');
  });

  it('uses custom base URL', async () => {
    const customUrl = 'https://custom.api';
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getForecastByCity('Rome', apiKey, customUrl);

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining(customUrl));
  });

  it('returns the parsed response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await getForecastByCity('Madrid', apiKey);
    expect(result).toEqual(mockResponse);
  });

  it('throws error on non-OK response with JSON body', async () => {
    const errorBody = { message: 'City not found' };
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      text: () => Promise.resolve(JSON.stringify(errorBody)),
    });

    await expect(getForecastByCity('FakeCity', apiKey)).rejects.toThrow(
      /City not found/
    );
  });

  it('throws error on non-OK response with plain text body', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      text: () => Promise.resolve('Something went wrong'),
    });

    await expect(getForecastByCity('OopsCity', apiKey)).rejects.toThrow(
      /Something went wrong/
    );
  });
});
