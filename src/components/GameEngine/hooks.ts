import { useEffect, useState, useRef } from 'react';
import useInterval from 'use-interval';

import useKeyPress from '@hooks/useKeyPress';
import useSizes from '@hooks/useSizes';
import {
  GameContainer,
  Plan,
  GameElement,
} from '@components/GameEngine/styles';
import useIsTouchDevice from '@hooks/useIsTouchDevice';

import { calculateOffsets } from './helpers';
import { GameElementProps, GameEngineProps, PlanProps } from './types';
import {
  FIRST_PLAN_STEP,
  FITH_PLAN_STEP,
  FOURTH_PLAN_STEP,
  SECOND_PLAN_STEP,
  THIRD_PLAN_STEP,
} from './constants';

export const useGameEngine = ({
  onJump,
  onTop,
  onResize,
  elementWidth,
  maxRightOffset,
  isActive,
  initPosition,
  onMove,
  nbLines,
}: GameEngineProps) => {
  const { width, height } = useSizes();

  const screenSize = Math.round(width / elementWidth) - 1;
  const centerPosition = Math.round(screenSize / 2) - 1;

  const [initialHeroLeft, initialFirstPlanLeft] = calculateOffsets(
    centerPosition,
    maxRightOffset,
    screenSize,
    initPosition
  );

  const [heroLeft, setHeroLeft] = useState(initialHeroLeft);
  const [firstPlanLeft, setFirstPlanLeft] = useState(initialFirstPlanLeft);
  const [isJumping, setIsJumping] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [canJump, setCanJump] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [touchSpace, setTouchSpace] = useState(false);
  const [touchTop, setTouchTop] = useState(false);
  const [touchLeft, setTouchLeft] = useState(false);
  const [touchRight, setTouchRight] = useState(false);
  const [touchBottom, setTouchBottom] = useState(false);

  const top = useKeyPress(['ArrowUp', 'z']);
  const left = useKeyPress(['ArrowLeft', 'q']);
  const right = useKeyPress(['ArrowRight', 'd']);
  const bottom = useKeyPress(['ArrowDown', 's']);
  const space = useKeyPress([' ']);

  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const positionInTheGrid = heroLeft + -firstPlanLeft;

  const canGoToRight =
    maxRightOffset * elementWidth +
      firstPlanLeft * elementWidth -
      elementWidth >=
    width;

  /**
   * Handle the right move
   */
  const rightHandler = () => {
    if (isLoading) return;
    if ((!right && !touchRight) || left) return;

    if (onMove) {
      onMove({ direction: 'right', position: positionInTheGrid + 1 });
    }

    if (heroLeft >= centerPosition) {
      if (canGoToRight) {
        setFirstPlanLeft(firstPlanLeft - FIRST_PLAN_STEP);
      } else if (heroLeft < screenSize - 1) {
        setHeroLeft(heroLeft + 1);
      }
    } else {
      setHeroLeft(heroLeft + 1);
    }
  };

  /**
   * Handle the left move
   */
  const leftHandler = () => {
    if (isLoading) return;
    if ((!left && !touchLeft) || right) return;

    if (onMove) {
      onMove({ direction: 'left', position: positionInTheGrid - 1 });
    }

    if (heroLeft > centerPosition || heroLeft < centerPosition) {
      if (heroLeft > 1) {
        setHeroLeft(heroLeft - 1);
      }
    } else if (firstPlanLeft < 0) {
      setFirstPlanLeft(firstPlanLeft + FIRST_PLAN_STEP);
    } else {
      setHeroLeft(heroLeft - 1);
    }
  };

  /**
   * Fired when the hero is jumping
   */
  const onJumping = () => {
    if (isLoading) return;

    if (canJump && isActive) {
      setIsJumping(true);
      setCanJump(false);

      if (timeouts?.current) {
        timeouts.current.push(setTimeout(() => setIsJumping(false), 300));
        timeouts.current.push(setTimeout(() => setCanJump(true), 400));
      }

      if (onJump && isActive) {
        onJump(positionInTheGrid);
      }
    }
  };

  /**
   * Fired when the hero is walking
   */
  const handleHeroWalking = () => {
    if (isLoading) return;

    if (
      isActive &&
      ((touchLeft && heroLeft > 1) ||
        (touchRight && heroLeft < screenSize - 1) ||
        (!right && left && heroLeft > 1) ||
        (!left && right && heroLeft < screenSize - 1))
    ) {
      setIsWalking(true);
    } else {
      setIsWalking(false);
    }
  };

  /**
   * Handle screen resize
   */
  const handleScreenResize = () => {
    const currentPositionInGrid = Math.abs(firstPlanLeft) + Math.abs(heroLeft);
    const [newHeroLeft, newFirstPlanLeft] = calculateOffsets(
      centerPosition,
      maxRightOffset,
      screenSize,
      currentPositionInGrid
    );

    setHeroLeft(newHeroLeft);
    setFirstPlanLeft(newFirstPlanLeft);
    setIsLoading(true);

    timeouts?.current.forEach(clearTimeout);
    timeouts.current = [];

    timeouts?.current.push(setTimeout(() => setIsLoading(false), 1700));

    if (onResize) onResize();
  };

  // Handle moves
  useInterval(
    () => {
      if (isActive) {
        rightHandler();
        leftHandler();
      }
      handleHeroWalking();
    },
    200,
    true
  );

  useEffect(
    () => () => {
      if (timeouts.current) {
        timeouts.current.forEach(clearTimeout);
        timeouts.current = [];
      }
    },
    []
  );

  // Call onTop callback
  useEffect(() => {
    if (isLoading) return;

    if ((top || touchTop) && isActive && onTop) {
      onTop(positionInTheGrid);
    }
  }, [top, touchTop]);

  // Trigger the jump
  useEffect(() => {
    if (isLoading) return;

    if (space || touchSpace) onJumping();
  }, [space, touchSpace]);

  // Recalculate offset when user is resizing the window
  useEffect(handleScreenResize, [width, height]);

  const lineHeight = height / nbLines;

  const calculateX = (distance: number) => Math.round(distance * elementWidth);
  const calculateY = (distance: number) => Math.round(distance * lineHeight);

  const getCommandProps = () => ({
    onSpaceChange: (v: boolean) => {
      if (v) {
        setTouchSpace(true);
        timeouts?.current.push(setTimeout(() => setTouchSpace(false), 300));
      }
    },
    onArrowUpChange: (v: boolean) => setTouchTop(v),
    onArrowLeftChange: (v: boolean) => setTouchLeft(v),
    onArrowRightChange: (v: boolean) => setTouchRight(v),
    onArrowDownChange: (v: boolean) => setTouchBottom(v),
  });

  const getElementProps = ({
    width,
    height,
    top,
    bottom,
    left,
    ...rest
  }: GameElementProps) => ({
    ...rest,
    left: calculateX(left),
    height: calculateY(height),
    width: calculateX(width),
    top: top !== undefined ? calculateY(top) : undefined,
    bottom: bottom !== undefined ? calculateY(bottom) : undefined,
  });

  const getPlanProps = (planNumber: 1 | 2 | 3 | 4 | 5): PlanProps => ({
    left: calculateX(firstPlanLeft * [1, 0.4, 0.3, 0.2, 0.05][planNumber - 1]),
    'data-testid': `${planNumber}`,
    zIndex: [5, 4, 3, 2, 1][planNumber - 1],
  });

  return {
    heroLeft,
    isJumping,
    isWalking,
    isLoading,
    canJump,
    positionInTheGrid,
    top: top || touchTop,
    space: space || touchSpace,
    bottom: bottom || touchBottom,
    screenSize,
    centerPosition,
    height,
    width,
    GameContainer,
    GameElement,
    Plan,
    getX: calculateX,
    getY: calculateY,
    getCommandProps,
    getElementProps,
    getPlanProps,
  };
};
