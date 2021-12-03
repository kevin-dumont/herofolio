import { useEffect, useState, useRef, useMemo } from 'react';
import useInterval from 'use-interval';

import useKeyPress from '@hooks/useKeyPress';
import useSizes from '@hooks/useSizes';

import { calculateOffsets } from './helpers';
import { GameElementProps, GameEngineProps, PlanProps } from './types';
import { FIRST_PLAN_STEP, PLAN_STEPS } from './constants';
import { useAppDispatch } from '@hooks/useAppStore';
import { addJump, move } from '@store/game';

export const useGameEngine = ({
  route,
  onResize,
  elementWidth,
  maxRightOffset,
  isActive,
  initPosition,
  nbLines,
  heroPositioning: {
    height: heroHeight,
    width: heroWidth,
    y: heroBottom,
    jumpHeight,
  },
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

  const dispatch = useAppDispatch();

  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const xPosition = heroLeft - firstPlanLeft;

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

    dispatch(move({ route, position: xPosition + 1 }));

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

    dispatch(move({ route, position: xPosition - 1 }));

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
  const onJump = () => {
    if (isLoading) return;

    if (canJump && isActive) {
      dispatch(addJump());
      setIsJumping(true);
      setCanJump(false);

      if (timeouts?.current) {
        timeouts.current.push(setTimeout(() => setIsJumping(false), 300));
        timeouts.current.push(setTimeout(() => setCanJump(true), 400));
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

    onResize?.();
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

  // Trigger the jump
  useEffect(() => {
    if (isLoading) return;
    if (space || touchSpace) onJump();
  }, [space, touchSpace]);

  // Recalculate offset when user is resizing the window
  useEffect(handleScreenResize, [width, height]);

  const lineHeight = height / nbLines;

  const calculateX = (distance: number) => Math.round(distance * elementWidth);
  const calculateY = (distance: number) => Math.round(distance * lineHeight);

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

  const getElementProps = (
    props: Omit<
      GameElementProps,
      | 'calculateY'
      | 'calculateX'
      | 'heroPositioning'
      | 'nbLinesInGrid'
      | 'topPressed'
    >
  ): GameElementProps => ({
    ...props,
    nbLinesInGrid: nbLines,
    heroPositioning,
    calculateX,
    calculateY,
    topPressed: (top || touchTop) && isActive,
  });

  const getHeroElementProps = (
    props: Pick<GameElementProps, 'zIndex' | 'id' | 'data-testid'>
  ): GameElementProps => ({
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
