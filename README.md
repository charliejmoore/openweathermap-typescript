# A TypeScript Wrapper for the OpenWeather API

A [TypeScript](https://www.typescriptlang.org/) wrapper for the [OpenWeather API](https://openweathermap.org/api).

## Use

## Endpoints
- `getCurrentWeatherByCity`
- `getCurrentWeatherByCoordinates`
- `getForecastByCity`
- `getForecastByCoordinates`

## Running This Code Locally
- Download the repo
- Configure your environment variables (see below) so your API key is hooked up.
- Run: `npm run example` to see output in the terminal.

## 🔑 Environment Variables

This project requires an OpenWeatherMap API key, which you can acquire by signing up [here](https://home.openweathermap.org/users/sign_up).

1. Copy `.env.example` to `.env` in the project root.
2. Add your OpenWeatherMap API key:
```
OWM_API_KEY=your-api-key-here
```
3. Your key will **not** be committed if you follow the `.gitignore`.
