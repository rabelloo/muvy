import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { RequestInit, URLSearchParamsInit } from 'apollo-env';
import { environment } from '../environment';
import { camelize } from '../util/camelize';
import { Response } from './response';

export class TmdbApi extends RESTDataSource {
  async getResults<T = any>(
    path: string,
    params?: URLSearchParamsInit,
    init?: RequestInit
  ): Promise<T[]> {
    return this.get<Response<T>>(path, params, init).then(({ results }) =>
      results.map(camelize)
    );
  }

  async get<T = any>(
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
