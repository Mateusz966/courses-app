/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from 'react';

interface UseMobile {
  isMobile: boolean;
}

export const useMobile = (): UseMobile => {
  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = () => {
    const media = window.matchMedia('(min-width: 991px)');
    if (media.matches) {
      setIsMobile(false);
    } else setIsMobile(true);
  };

  useEffect(() => {
    checkIsMobile();
  }, []);

  return {
    isMobile,
  };
};
