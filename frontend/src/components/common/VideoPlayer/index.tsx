import React, { useEffect } from 'react';
import Player from '@vimeo/player';

export const VideoPlayer = () => {

  useEffect(() => {
    const player = new Player('videoPlayer', {
        id: 226053498,
        width: 640
    });
    
    player.on('play', function() {
        console.log('played the video!');
    });
  }, []);

  return <div id="videoPlayer"></div>;
};
