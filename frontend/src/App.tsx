import { ChakraProvider, CSSReset, Spinner } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { history } from './config/history';
import { Header } from './components/common/Header';
import { RootStoreProvider } from './stores/storeContext';

const Register = lazy(() => import('./views/Register'));
const Login = lazy(() => import('./views/Login'));
const Dashboard = lazy(() => import('./views/Dashboard'));

const App = () => {
  return (
    <RootStoreProvider>
      <ChakraProvider>
        <CSSReset />
        <Router history={history}>
          <Header />
          <Switch>
            <Suspense fallback={<Spinner size="xl" />}>
              <Route path="/dashboard" component={Dashboard} />
              <Route exact path="/sign-up" component={Register} />
              <Route exact path="/sign-in" component={Login} />
            </Suspense>
          </Switch>
        </Router>
      </ChakraProvider>
    </RootStoreProvider>
  );
};

export default App;
