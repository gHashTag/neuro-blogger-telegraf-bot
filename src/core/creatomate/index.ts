import { RunwayML } from '@runwayml/sdk';

const Creatomate = require('creatomate');

if (!process.env.CREATOMATE_API_KEY) {
  throw new Error('CREATOMATE_API_KEY is not set');
}

export const clientRunway = new RunwayML({
  apiKey: process.env.RUNWAY_API_KEY,
});

export const client = new Creatomate.Client(process.env.CREATOMATE_API_KEY);
