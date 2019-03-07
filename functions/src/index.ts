import { ApolloServer } from 'apollo-server-cloud-functions';
import { config, https } from 'firebase-functions';
import { serverConfig } from './core/server';
import { environment } from './environment';

environment.apiKey = config().api.key;

export const api = https.onRequest(
  new ApolloServer(serverConfig).createHandler()
);
