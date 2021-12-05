import React, { memo } from 'react';

import GameEngine from '@components/GameEngine';
import { Cloud } from '@components/Design/Cloud';
import { WithGameElementProps } from '@components/GameEngine/types';

export type CloudsProps = WithGameElementProps<{}>;

const Clouds = ({ getProps }: CloudsProps) => {
  const clouds = [
    { top: 2, left: 1 },
    { top: 3, left: 9 },
    { top: 1, left: 17 },
    { top: 2, left: 25 },
    { top: 2, left: 35 },
    { top: 3, left: 42 },
  ];

  return (
    <>
      {clouds.map((cloud) => (
        <GameEngine.Element
          key={`${cloud.top + cloud.left}`}
          {...getProps({
            zIndex: 1,
            top: cloud.top,
            left: cloud.left,
            width: 3,
            height: 2,
          })}
        >
          <Cloud />
        </GameEngine.Element>
      ))}
    </>
  );
};

export default memo(Clouds);
