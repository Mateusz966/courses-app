import { ChakraProvider } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { history } from './config/history';



const Home = lazy(() => import('./views/Home'));
const Register = lazy(() => import('./views/Register'));


const App = () => {
  return (
    <ChakraProvider>
      <Router history={history}>
        <Switch>
          <Suspense fallback={<div>...loading</div>}>
            <Route exact path="/" component={Home} />
            <Route exact path="/sign-up" component={Register} />
          </Suspense>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
