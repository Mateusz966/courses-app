import { useEffect } from 'react';
import { useRootStore } from '../stores/storeContext';

const useHeader = (
  title: string,
  subtitle?: string,
  noLeft?: boolean,
  hide?: boolean
) => {
  const { headerStore } = useRootStore();

  useEffect(() => {
    headerStore.setHeader({ title, subtitle, noLeft, hide });
  }, [title, subtitle, noLeft, hide]);
};
export default useHeader;
