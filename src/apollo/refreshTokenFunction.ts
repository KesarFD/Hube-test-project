import { gql, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
    }
  }
`;

// Create a separate ApolloClient for refreshing token
const refreshTokenClient = new ApolloClient({
  link: new HttpLink({ uri: 'https://your-api-endpoint' }),
  cache: new InMemoryCache()
});

const refreshTokenFunction = async (refreshToken: string) => {
  try {
    const { data } = await refreshTokenClient.mutate({
      mutation: REFRESH_TOKEN,
      variables: { refreshToken }
    });

    if (data && data.refreshToken && data.refreshToken.accessToken) {
      return data.refreshToken.accessToken;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Failed to refresh token', error);
    return null;
  }
};

export default refreshTokenFunction;
