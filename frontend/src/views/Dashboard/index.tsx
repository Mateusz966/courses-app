import { Spinner, Switch } from '@chakra-ui/react';
import { FC, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { TopNavBar } from '../../components/common/TopNavbar';
import useHeader from '../../hooks/useHeader';
import Profile from '../Profile';

const Dashboard: FC = () => {
  useHeader('', undefined, '', undefined, undefined, true);
  return (
    <>
      <TopNavBar />
      <Switch>
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </>
  );
};

export default Dashboard;
