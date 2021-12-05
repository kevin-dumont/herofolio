import { memo, PropsWithChildren, useEffect } from 'react';

import Commands from '@components/GameEngine/Commands';
import { GameElement, GameContainer, Plan } from '@components/GameEngine/styles';
import { isHeroOnElement } from '@components/GameEngine/helpers';
import type { GameContainerProps, GameElementProps } from '@components/GameEngine/types';

const GameEngine = (props: PropsWithChildren<GameContainerProps>) => <GameContainer {...props} />;

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

  useEffect(() => {
    if (
      onCollision &&
      isHeroOnElement({
        elHeight: height,
        elWidth: width,
        elTop: top,
        elBottom: bottom,
        elLeft: left,
        nbLinesInGrid,
        heroLeft,
        heroTop,
        heroHeight,
      })
    ) {
      onCollision();
    }
  }, [heroLeft, heroTop, onCollision]);

  useEffect(() => {
    if (
      onTopPress &&
      topPressed &&
      isHeroOnElement({
        elHeight: height,
        elWidth: width,
        elTop: top,
        elBottom: bottom,
        elLeft: left,
        nbLinesInGrid,
        heroLeft,
        heroTop,
        heroHeight,
      })
    ) {
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
