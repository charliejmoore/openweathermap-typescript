/** Playground to show features of the OpenWeatherMap TypeScript wrapper. */

import dotenv from 'dotenv';
dotenv.config({ path: './example/.env' });

import { createOpenWeatherMapClient } from '../src/OpenWeatherMapClient';

const apiKey = process.env.OWM_API_KEY;
if (!apiKey) throw new Error('Please set OWM_API_KEY in example/.env');

const owm = createOpenWeatherMapClient({ apiKey });

async function main() {
  const weather = await owm.getCurrentWeatherByCity('London');
  console.log('Weather::', weather);
}

main().catch(console.error);
