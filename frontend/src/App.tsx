import { ChakraProvider, CSSReset, Spinner } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { history } from './config/history';
import { store } from './config/store';
import { Header } from './components/common/Header';

const Register = lazy(() => import('./views/Register'));
const Login = lazy(() => import('./views/Login'));
const Dashboard = lazy(() => import('./views/Dashboard'));

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <CSSReset />
        <Router history={history}>
        <Header />
          <Switch>
            <Suspense fallback={<Spinner size="xl" />}>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/sign-up" component={Register} />
              <Route exact path="/sign-in" component={Login} />
            </Suspense>
          </Switch>
        </Router>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
