import React, { FC, useEffect } from 'react';
import Player from '@vimeo/player';

interface Props {
  id: number;
}

export const VideoPlayer:FC<Props> = ({id}) => {

  useEffect(() => {
    const player = new Player('videoPlayer', {
        url: `https://vimeo.com/${id}`,
        width: 640
    });
    
    player.on('play', function() {
        console.log('played the video!');
    });
  }, []);

  return <div id="videoPlayer"></div>;
};
