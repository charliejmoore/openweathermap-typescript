import { getCurrentAirPollutionByCoordinates } from '../../src/endpoints/getCurrentAirPollutionByCoordinates';
import { BASE_OWM_API } from '../../src/constants';
import { AirPollutionResponse } from '../../src/types/AirPollutionResponse';

global.fetch = jest.fn();
const mockFetch = fetch as jest.Mock;

describe('getCurrentAirPollutionByCoordinates', () => {
  const apiKey = 'test-api-key';
  const latitude = 40.7128;
  const longitude = -74.006;

  const mockResponse: AirPollutionResponse = {
    coord: { lat: latitude, lon: longitude },
    list: [
      {
        main: { aqi: 2 },
        components: {
          co: 201.94,
          no: 0.02,
          no2: 0.74,
          o3: 68.65,
          so2: 0.64,
          pm2_5: 8.07,
          pm10: 11.55,
          nh3: 0.12,
        },
        dt: 1628884800,
      },
    ],
  };

  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('builds correct URL with latitude and longitude', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getCurrentAirPollutionByCoordinates({ latitude, longitude }, apiKey);

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_OWM_API}/air_pollution?lat=40.7128&lon=-74.006&appid=${apiKey}`
    );
  });

  it('uses a custom base URL if provided', async () => {
    const customUrl = 'https://custom.api';
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await getCurrentAirPollutionByCoordinates(
      { latitude, longitude },
      apiKey,
      customUrl
    );

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining(customUrl));
  });

  it('returns the parsed response on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await getCurrentAirPollutionByCoordinates(
      { latitude, longitude },
      apiKey
    );
    expect(result).toEqual(mockResponse);
  });

  it('throws on non-OK response with JSON error body', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      text: () =>
        Promise.resolve(JSON.stringify({ message: 'Invalid location' })),
    });

    await expect(
      getCurrentAirPollutionByCoordinates({ latitude, longitude }, apiKey)
    ).rejects.toThrow(/Invalid location/);
  });

  it('throws on non-OK response with plain text', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Server Error',
      text: () => Promise.resolve('Server failed'),
    });

    await expect(
      getCurrentAirPollutionByCoordinates({ latitude, longitude }, apiKey)
    ).rejects.toThrow(/Server failed/);
  });
});
