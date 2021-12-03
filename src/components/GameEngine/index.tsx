import { memo, PropsWithChildren, useEffect } from 'react';
import { intersection, range } from 'lodash';

import Commands from '@components/GameEngine/Commands';
import {
  GameElement,
  GameContainer,
  Plan,
} from '@components/GameEngine/styles';
import type {
  GameContainerProps,
  GameElementProps,
} from '@components/GameEngine/types';

const GameEngine = (props: PropsWithChildren<GameContainerProps>) => (
  <GameContainer {...props} />
);

GameEngine.Commands = memo(Commands);

GameEngine.Element = ({
  height,
  width,
  top,
  bottom,
  left,
  calculateX,
  calculateY,
  onCollision,
  onTopPress,
  heroPositioning,
  nbLinesInGrid,
  topPressed,
  ...props
}: PropsWithChildren<GameElementProps>) => {
  const { x: heroLeft, y: heroTop, height: heroHeight } = heroPositioning;

  const isHeroOnElement = () => {
    const isOnSameYPosition = () => {
      const elementTop = top || nbLinesInGrid - (bottom as number) - height;
      const elementBottom = elementTop + height;
      const heroBottom = heroTop + heroHeight;

      const heroRange = range(heroTop, heroBottom + 1);
      const elementRange = range(elementTop, elementBottom + 1);
      const intersect = intersection(elementRange, heroRange);

      return intersect.length > 0;
    };

    const elementRight = left + width;
    const isOnSameXPosition = heroLeft >= left && heroLeft <= elementRight;

    return isOnSameXPosition && isOnSameYPosition();
  };

  useEffect(() => {
    if (onCollision && isHeroOnElement()) {
      onCollision();
    }
  }, [heroLeft, heroTop, onCollision]);

  useEffect(() => {
    if (onTopPress && topPressed && isHeroOnElement()) {
      onTopPress();
    }
  }, [topPressed, onTopPress]);

  return (
    <GameElement
      top={top !== undefined ? calculateY(top) : undefined}
      bottom={bottom !== undefined ? calculateY(bottom) : undefined}
      left={calculateX(left)}
      height={calculateY(height)}
      width={calculateX(width)}
      {...props}
    />
  );
};

GameEngine.Plan = memo(Plan);

export default GameEngine;
