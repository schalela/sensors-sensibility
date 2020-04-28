

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  ssrMode: false,
  link: new HttpLink({
    uri: 'https://jtzg6hkmt5gyhh7pxuyrhmovqm.appsync-api.us-west-2.amazonaws.com/graphql', // Server URL (must be absolute)
    headers: {
      'x-api-key': 'da2-kuhwlvbgb5fttam6wldhlpy3ji'
    }, // Additional fetch() options like `credentials` or `headers`
    fetch,
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
});

export default ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

