import { ChakraProvider, CSSReset, Spinner } from '@chakra-ui/react';
import { FC, lazy, Suspense } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { Center } from '@chakra-ui/layout';
import { history } from './config/history';
import { Header } from './components/common/Header';
import { RootStoreProvider } from './stores/storeContext';
import { axios401Interceptor } from './config/axios';
import theme from './config/theme';

const Register = lazy(() => import('./views/Register'));
const Login = lazy(() => import('./views/Login'));
const Dashboard = lazy(() => import('./views/Dashboard'));
const Home = lazy(() => import('./views/Home'));

axios401Interceptor();

const App: FC = () => (
  <RootStoreProvider>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Router history={history}>
        <Header />
        <Switch>
          <Suspense
            fallback={
              <Center
                position="fixed"
                left="0"
                right="0"
                top="0"
                bottom="0"
                margin="auto"
                background="white"
                height="100vh"
                width="100wh"
                zIndex="1"
              >
                <Spinner size="xl" />
              </Center>
            }
          >
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route exact path="/sign-up" component={Register} />
            <Route exact path="/sign-in" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
          </Suspense>
        </Switch>
      </Router>
    </ChakraProvider>
  </RootStoreProvider>
);

export default App;
