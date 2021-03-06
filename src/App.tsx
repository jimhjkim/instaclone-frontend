import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { client, darkModeVar, isLoggedInVar } from './apollo';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import SignUp from './screens/SignUp';
import GlobalStyles from './styles';
import { darkTheme, lightTheme } from './themes';

interface IContainerProps {
  floating: boolean;
}

const Container = styled.div<IContainerProps>`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.fontColor};
  box-shadow: ${(props) => (props.floating ? '10px' : '')};
`;

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isDarkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Container floating={true}>
            <Router>
              <Routes>
                <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
                <Route
                  path="/sign-up"
                  element={isLoggedIn ? null : <SignUp />}
                />
                <Route element={<NotFound />} />
                <Route path="*" element={<Navigate to="/" />}></Route>
              </Routes>
            </Router>
          </Container>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
