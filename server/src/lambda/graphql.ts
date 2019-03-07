import { ApolloServer } from 'apollo-server-lambda';
import { serverConfig } from '../core/server';

export const handler = new ApolloServer(serverConfig).createHandler();
