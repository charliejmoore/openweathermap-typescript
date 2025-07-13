import { groupForecastByDay } from '../groupForecastByDay';
import { ForecastItem } from '../../types/ForecastResponse';

describe('groupForecastByDay', () => {
  const forecastList: ForecastItem[] = [
    {
      dt: 1720822800,
      dt_txt: '2025-07-13 03:00:00',
      main: {
        temp: 298,
        feels_like: 298,
        temp_min: 297,
        temp_max: 299,
        pressure: 1012,
        humidity: 50,
        sea_level: 0,
        grnd_level: 0,
      },
      weather: [],
      clouds: { all: 10 },
      wind: { speed: 2.5, deg: 100 },
      visibility: 10000,
      pop: 0,
      snow: undefined,
      rain: undefined,
      sys: {
        pod: 'n',
      },
    },
    {
      dt: 1720833600,
      dt_txt: '2025-07-13 06:00:00',
      main: {
        temp: 295,
        feels_like: 295,
        temp_min: 294,
        temp_max: 296,
        pressure: 1010,
        humidity: 60,
        sea_level: 0,
        grnd_level: 0,
      },
      weather: [],
      clouds: { all: 20 },
      wind: { speed: 1.5, deg: 120 },
      visibility: 10000,
      pop: 0,
      snow: undefined,
      rain: undefined,
      sys: {
        pod: 'n',
      },
    },
    {
      dt: 1720916400,
      dt_txt: '2025-07-14 00:00:00',
      main: {
        temp: 300,
        feels_like: 300,
        temp_min: 299,
        temp_max: 301,
        pressure: 1013,
        humidity: 40,
        sea_level: 0,
        grnd_level: 0,
      },
      weather: [],
      clouds: { all: 5 },
      wind: { speed: 3.0, deg: 80 },
      visibility: 10000,
      pop: 0,
      snow: undefined,
      rain: undefined,
      sys: {
        pod: 'n',
      },
    },
  ];

  it('groups forecast items by date string (YYYY-MM-DD)', () => {
    const grouped = groupForecastByDay(forecastList);

    expect(Object.keys(grouped)).toEqual(['2025-07-13', '2025-07-14']);
    expect(grouped['2025-07-13']).toHaveLength(2);
    expect(grouped['2025-07-14']).toHaveLength(1);
  });

  it('uses dt timestamp if dt_txt is missing', () => {
    const modified = [
      {
        ...forecastList[0],
        dt_txt: undefined,
        dt: new Date('2025-07-13T00:00:00Z').getTime() / 1000,
      },
      {
        ...forecastList[1],
        dt_txt: undefined,
        dt: new Date('2025-07-13T03:00:00Z').getTime() / 1000,
      },
      {
        ...forecastList[2],
        dt_txt: undefined,
        dt: new Date('2025-07-14T00:00:00Z').getTime() / 1000,
      },
    ];

    const grouped = groupForecastByDay(modified);

    expect(Object.keys(grouped)).toEqual(['2025-07-13', '2025-07-14']);
  });
});
