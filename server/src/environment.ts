import { config } from 'dotenv';

config();

export const environment = {
  apiKey: process.env.apiKey!,
  apiUrl: 'https://api.themoviedb.org/3',
  imagesUrl: 'https://image.tmdb.org/t/p',
};
