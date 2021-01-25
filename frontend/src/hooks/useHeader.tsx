import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setHeader } from '../slices/header';


const useHeader = (title: string, subtitle?: string, back?: string, noLeft?: boolean, hideOnMobile?: boolean, hide?: boolean) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeader({title, subtitle, back, noLeft, hideOnMobile, hide}));
  }, [title, subtitle, back, noLeft, hideOnMobile, hide]);
};
export default useHeader;
