import React from 'react';
import { useHistory } from 'react-router-dom';

import { Hero } from '@/components/Design/Hero';
import useMedia from '@/hooks/useMedia';
import {
  GRID_SIZES_SMALL,
  GRID_SIZES_LARGE,
  GRID_ELEMENT_WIDTH,
} from '@/constants/constants';
import GameEngine, { MoveParms } from '@/components/GameEngine';
import { useAppDispatch } from '@/hooks/useAppStore';
import { move } from '@/store/game';
import { Ground } from '@/containers/Skills/styles';

export const GRID_WIDTH = 70;
export const DOOR_HEIGHT = 3;

const Skills = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { GROUND_HEIGHT, JUMP, GRID_HEIGHT, HERO_SIZE } = useMedia(
    (_, height) => {
      if (height < 600) {
        return {
          ...GRID_SIZES_SMALL,
        };
      }
      return {
        ...GRID_SIZES_LARGE,
      };
    }
  );

  const onTop = (p: number) => {
    if (p === 1) {
      setTimeout(() => {
        history.push(`/`);
      }, 200);
    }
  };

  const onMove = ({ position }: MoveParms) => {
    dispatch(move({ location: 'skills', position }));
  };

  return (
    <GameEngine
      isActive
      onTop={onTop}
      onMove={onMove}
      maxRightOffset={GRID_WIDTH}
      nbLines={GRID_HEIGHT}
      elementWidth={GRID_ELEMENT_WIDTH}
    >
      {({
        canJump,
        isJumping,
        heroLeft,
        isWalking,
        firstPlanLeft,
        width,
        height,
        getY,
        getX,
        GameContainer,
        GameElement,
        Plan,
      }) => (
        <GameContainer width={width} height={height} background="#bce4ff">
          {/* Hero */}

          <GameElement
            zIndex={10}
            bottom={getY(GROUND_HEIGHT)}
            left={heroLeft * 60}
            height={getY(HERO_SIZE)}
            width={getX(1)}
          >
            <Hero
              show
              isWalking={isWalking && canJump}
              jumpHeight={getY(JUMP)}
              isJumping={isJumping}
            />
          </GameElement>

          <Plan zIndex={5} left={getX(firstPlanLeft)} data-testid="plan1">
            <GameElement
              data-testid="ground"
              zIndex={10}
              bottom={0}
              left={0}
              height={getY(GROUND_HEIGHT)}
              width={getX(GRID_WIDTH)}
            >
              <Ground />
            </GameElement>
          </Plan>
        </GameContainer>
      )}
    </GameEngine>
  );
};

export default Skills;
