import {
  ChakraProvider,
  ColorModeScript,
  CSSReset,
  Spinner,
} from '@chakra-ui/react';
import { FC, lazy, Suspense } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { history } from './config/history';
import { Header } from './components/common/Header';
import { RootStoreProvider } from './stores/storeContext';
import { axios401Interceptor } from './config/axios';
import theme from './config/theme';

const Register = lazy(() => import('./views/Register'));
const Login = lazy(() => import('./views/Login'));
const Dashboard = lazy(() => import('./views/Dashboard'));

axios401Interceptor();

const App: FC = () => (
  <RootStoreProvider>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CSSReset />
      <Router history={history}>
        <Header />
        <Switch>
          <Suspense fallback={<Spinner size="xl" />}>
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            <Route exact path="/sign-up" component={Register} />
            <Route exact path="/sign-in" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
          </Suspense>
        </Switch>
      </Router>
    </ChakraProvider>
  </RootStoreProvider>
);

export default App;
