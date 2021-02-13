import { FC } from 'react';
import { Route } from 'react-router-dom';
import { TopNavBar } from '../../components/common/TopNavbar';
import useHeader from '../../hooks/useHeader';
import Profile from '../Profile/ProfileData';

const Dashboard: FC = () => {
  useHeader('', undefined, undefined, undefined);
  return (
    <>
      <TopNavBar />
      <Route exact path="/profile" component={Profile} />
    </>
  );
};

export default Dashboard;
