import { FC } from 'react';
import { TopNavBar } from '../../components/common/TopNavbar';
import useHeader from '../../hooks/useHeader';

const Dashboard: FC = () => {
  useHeader('', undefined, '', undefined, undefined, true);
  return <TopNavBar />;
};

export default Dashboard;
