import React from 'react'

import "video-react/dist/video-react.css"; // import css
import { Player, BigPlayButton, LoadingSpinner } from 'video-react';

import mediaqueries from "@styles/media";
import styled from '@emotion/styled';

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 944px;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.2),
    0 18px 36px -18px rgba(0, 0, 0, 0.22);

  ${mediaqueries.tablet`
    max-width: 100%;
  `}

  ${mediaqueries.phablet`
    margin: 0 auto;
    width: calc(100vw - 40px);
    height: 220px;

    & > div {
      height: 220px;
    }
  `}
`;

const VideoPlayer = ({poster, src}) => (
  <HeroImage>
    <Player
      poster={poster}
      src={src}>
      <BigPlayButton position="center" />
      <LoadingSpinner />
    </Player>
  </HeroImage>
)

export default VideoPlayer;