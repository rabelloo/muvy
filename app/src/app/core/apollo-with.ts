import { apolloClient } from './apollo-client';

/**
 * Creates an object with helper functions for apolloClient's APIs
 * @param queries Object with keys as query names and values as GraphQL queries
 */
export function apolloWith<Q>(queries: Q) {
  const pending: any = {};

  return {
    query: <T>(name: keyof Q, variables?: any) =>
      query<Q, T>(queries, name, variables),
    switchQuery: <T>(name: keyof Q, variables?: any) =>
      switchQuery<Q, T>(
        queries,
        pending[name] || (pending[name] = {}),
        name,
        variables
      ),
  };
}

async function query<Q, T>(
  queries: Q,
  name: keyof Q,
  variables?: any
): Promise<T> {
  return apolloClient
    .query({
      query: queries[name],
      variables,
    })
    .then(({ data }) => data[name]);
}

function switchQuery<Q, T>(
  queries: Q,
  pending: { subscription?: ZenObservable.Subscription },
  name: keyof Q,
  variables?: any
): Promise<T> {
  if (pending.subscription) {
    pending.subscription.unsubscribe();
  }

  return new Promise((resolve, reject) => {
    pending.subscription = apolloClient
      .watchQuery({
        query: queries[name],
        variables,
      })
      .subscribe(({ data, errors }) =>
        errors ? reject(errors) : resolve(data[name])
      );
  });
}
