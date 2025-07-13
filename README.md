# 🌦️ OpenWeatherMap TypeScript Client

A modern, fully-typed [OpenWeather API](https://openweathermap.org/api) client built with [TypeScript](https://www.typescriptlang.org/). Supports current weather, forecast, air pollution, and more. Includes utilities.

## 🚀 Installation
TODO

## 🛠️ Usage

```ts
import { createOpenWeatherMapClient } from './OpenWeatherMapClient'; // TODO

const client = createOpenWeatherMapClient({
  apiKey: 'your-api-key',
});

const weather = await client.getCurrentWeatherByCity('London');
console.log("Current temperature in London: ", weather.main.temp);
```

### ⚙️ Configuration
`createOpenWeatherMapClient(config)`
| Option    | Description                                       |
| --------- | ------------------------------------------------- |
| `apiKey`  | Your OpenWeatherMap API key (required)            |
| `baseUrl` | `Optional base URL override (for testing/mocking) |

This project requires an OpenWeatherMap API key, which you can acquire by signing up [here](https://home.openweathermap.org/users/sign_up).

1. Copy `.env.example` to `.env` in the project root.
2. Add your OpenWeatherMap API key:
```
OWM_API_KEY=your-api-key-here
```
3. Your key will **not** be committed if you follow the `.gitignore`.

## ✨ Features
### 🌐 Supported Endpoints
#### Current Weather Data
| Method                                | Description              |
| ------------------------------------- | ------------------------ |
| `getCurrentWeatherByCity`             | Get weather by city name |
| `getCurrentWeatherByCoordinates`      | Get weather by lat/lon   |
| `getCurrentWeatherByZipCode`          | Get weather by ZIP code  |
| `getCurrentAirPollutionByCoordinates` | Air quality index        |

#### Forecasted Weather Data
| Method                     | Description               |
| -------------------------- | ------------------------- |
| `getForecastByCity`        | 5-day forecast by city    |
| `getForecastByCoordinates` | 5-day forecast by lat/lon |

### Utilities
| Method               | Description |
| -------------------- | ----------- |
| `groupForecastByDay` |             |

## Running This Code Locally
- Download the repo
- Configure your environment variables (see below) so your API key is hooked up.
- Run: `npm run example` to see output in the terminal.

## 🧪 Testing & Coverage
- `npm test`: to run all unit tests.
- `npm run test:coverage`: for a code coverage report.
  - Coverage reports output to `/coverage` (which is .gitignored)
