import { useEffect, useState, useRef, useMemo, useReducer, useCallback } from 'react';
import useInterval from 'use-interval';

import useKeyPress from '@hooks/useKeyPress';
import useSizes from '@hooks/useSizes';

import { calculateOffsets } from './helpers';
import { GameElementParams, GameElementProps, GameEngineProps, PlanProps } from './types';
import { FIRST_PLAN_STEP, PLAN_STEPS } from './constants';
import { useAppDispatch } from '@hooks/useAppStore';
import { addJump, move as appMove } from '@store/game';
import { useTimeouts } from '@hooks/useTimeouts';
import {
  getInitialState,
  jump,
  moveBack,
  moveForward,
  movePlan,
  reducer,
  stopJump,
  move,
  setLoading,
  touchDirection,
} from './reducer';

export const useGameEngine = ({
  route,
  onResize,
  elementWidth,
  maxRightOffset,
  isActive,
  initPosition,
  nbLines,
  heroPositioning: { height: heroHeight, width: heroWidth, y: heroBottom, jumpHeight },
}: GameEngineProps) => {
  const { width, height } = useSizes();

  const screenSize = useMemo(() => Math.round(width / elementWidth) - 1, [width, elementWidth]);
  const centerPosition = useMemo(() => Math.round(screenSize / 2) - 1, [screenSize]);

  const [initialHeroLeft, initialFirstPlanLeft] = useMemo(
    () => calculateOffsets(centerPosition, maxRightOffset, screenSize, initPosition),
    [centerPosition, maxRightOffset, screenSize, initPosition]
  );

  const initialState = getInitialState({ heroLeft: initialHeroLeft, firstPlanLeft: initialFirstPlanLeft });
  const [gameState, gameDispatch] = useReducer(reducer, initialState);

  const { heroLeft, firstPlanLeft, isJumping, isWalking, canJump, isLoading, up, left, right } = gameState;

  const upKeyPressed = useKeyPress(['ArrowUp', 'z']);
  const leftKeyPressed = useKeyPress(['ArrowLeft', 'q']);
  const rightKeyPressed = useKeyPress(['ArrowRight', 'd']);
  const downKeyPressed = useKeyPress(['ArrowDown', 's']);
  const spaceKeyPressed = useKeyPress([' ']);

  const appDispatch = useAppDispatch();

  const [addTimeout, clearTimeouts] = useTimeouts();

  const xPosition = heroLeft - firstPlanLeft;

  const canGoToRight = maxRightOffset * elementWidth + firstPlanLeft * elementWidth - elementWidth >= width;

  // Handle moves
  useInterval(
    () => {
      if (!isActive) return;
      if (isLoading) return;

      const rightHandler = () => {
        if (!right || left) return;

        appDispatch(appMove({ route, position: xPosition + 1 }));

        if (heroLeft >= centerPosition) {
          if (canGoToRight) {
            gameDispatch(movePlan(firstPlanLeft - FIRST_PLAN_STEP));
          } else if (heroLeft < screenSize - 1) {
            gameDispatch(moveForward());
          }
        } else {
          gameDispatch(moveForward());
        }
      };

      const leftHandler = () => {
        if (!left || right) return;

        appDispatch(appMove({ route, position: xPosition - 1 }));

        if (heroLeft > centerPosition || heroLeft < centerPosition) {
          if (heroLeft > 1) {
            gameDispatch(moveBack());
          }
        } else if (firstPlanLeft < 0) {
          gameDispatch(movePlan(firstPlanLeft + FIRST_PLAN_STEP));
        } else {
          gameDispatch(moveBack());
        }
      };

      rightHandler();
      leftHandler();
    },
    200,
    true
  );

  useEffect(() => {
    gameDispatch(touchDirection('up', upKeyPressed));
  }, [upKeyPressed]);

  useEffect(() => {
    gameDispatch(touchDirection('left', leftKeyPressed));
  }, [leftKeyPressed]);

  useEffect(() => {
    gameDispatch(touchDirection('right', rightKeyPressed));
  }, [rightKeyPressed]);

  useEffect(() => {
    gameDispatch(touchDirection('down', downKeyPressed));
  }, [downKeyPressed]);

  useEffect(() => {
    if (spaceKeyPressed) {
      appDispatch(addJump());
      gameDispatch(jump());
      addTimeout(() => gameDispatch(stopJump()), 300);
    }
  }, [spaceKeyPressed]);

  // Recalculate offset when user is resizing the window
  useEffect(() => {
    const currentPositionInGrid = Math.abs(firstPlanLeft) + Math.abs(heroLeft);
    const [newHeroLeft, newFirstPlanLeft] = calculateOffsets(
      centerPosition,
      maxRightOffset,
      screenSize,
      currentPositionInGrid
    );

    gameDispatch(move(newHeroLeft));
    gameDispatch(movePlan(newFirstPlanLeft));
    gameDispatch(setLoading(true));

    clearTimeouts();

    addTimeout(() => gameDispatch(setLoading(false)), 1700);

    onResize?.();
  }, [width, height]);

  const lineHeight = height / nbLines;

  const calculateX = useCallback((distance: number) => Math.round(distance * elementWidth), [elementWidth]);
  const calculateY = useCallback((distance: number) => Math.round(distance * lineHeight), [lineHeight]);

  const heroFinalBottom = useMemo(
    () => (isJumping ? heroBottom + jumpHeight : heroBottom),
    [jumpHeight, heroBottom, isJumping]
  );

  const heroPositioning = {
    x: xPosition,
    y: nbLines - heroFinalBottom - heroHeight,
    width: heroWidth,
    height: heroHeight,
  };

  const getCommandProps = useMemo(
    () => ({
      onSpaceChange: (v: boolean) => {
        if (v) {
          appDispatch(addJump());
          gameDispatch(jump());
          addTimeout(() => gameDispatch(stopJump()), 300);
        }
      },
      onArrowUpChange: (v: boolean) => gameDispatch(touchDirection('up', v)),
      onArrowLeftChange: (v: boolean) => gameDispatch(touchDirection('left', v)),
      onArrowRightChange: (v: boolean) => gameDispatch(touchDirection('right', v)),
      onArrowDownChange: (v: boolean) => gameDispatch(touchDirection('down', v)),
    }),
    []
  );

  const getElementProps = (props: GameElementParams): GameElementProps => ({
    ...props,
    nbLinesInGrid: nbLines,
    heroPositioning,
    calculateX,
    calculateY,
    topPressed: up,
  });

  const getHeroElementProps = (props: Pick<GameElementProps, 'zIndex' | 'id' | 'data-testid'>): GameElementProps => ({
    ...props,
    heroPositioning,
    nbLinesInGrid: nbLines,
    height: heroHeight,
    width: heroWidth,
    left: heroLeft,
    bottom: heroFinalBottom,
    calculateX,
    calculateY,
    topPressed: false,
  });

  const getPlanProps = (planNumber: 1 | 2 | 3 | 4 | 5): PlanProps => ({
    left: calculateX(firstPlanLeft * PLAN_STEPS[planNumber - 1]),
    'data-testid': `${planNumber}`,
    zIndex: [5, 4, 3, 2, 1][planNumber - 1],
  });

  const getHeroProps = () => ({
    isJumping,
    isWalking: isWalking && canJump,
    show: !isLoading,
  });

  const getGameEngineProps = () => ({
    height,
    width,
  });

  return {
    isLoading,
    xPosition,
    centerPosition,
    getCommandProps,
    getElementProps,
    getPlanProps,
    getHeroProps,
    getGameEngineProps,
    getHeroElementProps,
  };
};
