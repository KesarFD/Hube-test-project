import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from, Observable } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import Cookies from 'ts-cookies';
import refreshTokenFunction from './refreshTokenFunction';

const httpLink = new HttpLink({ uri: 'https://cosmobeauty-stage.ru/' });

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = Cookies.get('accessToken');
  
  if (accessToken) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
  
  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.extensions?.code === 'UNAUTHENTICATED') {

        const refreshToken = Cookies.get('refreshToken');

        return new Observable(observer => {
          refreshTokenFunction(refreshToken).then(newAccessToken => {
            if (newAccessToken) {
              Cookies.set('accessToken', newAccessToken);

              // Retry the failed request
              operation.setContext({
                headers: {
                  Authorization: `Bearer ${newAccessToken}`
                }
              });
              
              forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer)
              });
            } else {
              observer.error(new Error('Failed to refresh token'));
            }
          }).catch(error => {
            observer.error(error);
          });
        });
      }
    }
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache()
});

export default client;