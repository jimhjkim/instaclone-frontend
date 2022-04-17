import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

const TOKEN: string = 'token';

export const isLoggedInVar = makeVar<boolean>(
  Boolean(localStorage.getItem(TOKEN)),
);

export const handleLogin = (token: string): void => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const handleLogout = (): void => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  window.location.reload();
};

export const darkModeVar = makeVar(false);
export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
