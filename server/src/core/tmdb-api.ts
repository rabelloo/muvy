import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { RequestInit, URLSearchParamsInit } from 'apollo-server-env';
import { environment } from '../environment';
import { camelize } from '../util/camelize';
import { Response } from './response';

export class TmdbApi extends RESTDataSource {
  async getResults<T>(
    path: string,
    params?: URLSearchParamsInit,
    init?: RequestInit
  ): Promise<T[]> {
    return super
      .get<Response<T>>(path, params, init)
      .then(({ results }) => results.map(camelize));
  }

  async get<T>(
    path: string,
    params?: URLSearchParamsInit,
    init?: RequestInit
  ): Promise<T> {
    return super.get(path, params, init).then(camelize);
  }

  willSendRequest(request: RequestOptions) {
    request.params.set('api_key', environment.apiKey);
  }
}
