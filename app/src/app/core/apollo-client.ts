import ApolloClient from 'apollo-boost';
import { config } from 'dotenv';

config();

export const apolloClient = new ApolloClient({
  uri: process.env.apiUrl!,
});
