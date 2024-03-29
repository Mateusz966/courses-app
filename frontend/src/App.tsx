import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { history } from './config/history';
import { store } from './config/store';
import { RouteAuthorized } from './components/routes/RouteAuthorized';
import Dashboard from './views/Dashboard';



const Home = lazy(() => import('./views/Home'));
const Register = lazy(() => import('./views/Register'));


const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <CSSReset />
        <Router history={history}>
          <Switch>
            <Suspense fallback={<div>...loading</div>}>
              <Route exact path="/" component={Home} />
              <Route exact path="/sign-up" component={Register} />
              <RouteAuthorized exact path="/dashboard" component={Dashboard} />
            </Suspense>
          </Switch>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
