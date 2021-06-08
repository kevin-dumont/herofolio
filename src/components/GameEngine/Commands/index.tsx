import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

import useTouchHold from '@/hooks/useTouchHold';

export type Direction = 'up' | 'left' | 'right' | 'down';

interface ArrowProps {
  direction: Direction;
}

interface ArrowContainerProps {
  direction: Direction;
}

export interface CommandsProps {
  onSpaceChange: (isPressed: boolean) => any;
  onArrowUpChange: (isPressed: boolean) => any;
  onArrowDownChange: (isPressed: boolean) => any;
  onArrowLeftChange: (isPressed: boolean) => any;
  onArrowRightChange: (isPressed: boolean) => any;
}

const COMMANDS_COLOR = 'rgba(255, 255, 255, 0.65)';

const CommandsWrapper = styled.div`
  position: fixed;
  z-index: 15;
  bottom: 10px;
  right: 10px;
  width: 150px;
  height: 150px;
`;

const ArrowContainer = styled.div<ArrowContainerProps>`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  user-select: none;

  ${({ direction }) =>
    direction === 'down' &&
    css`
      left: calc(50% - 25px);
      bottom: 0;
    `}

  ${({ direction }) =>
    direction === 'up' &&
    css`
      left: calc(50% - 25px);
      top: 0;
    `}

  ${({ direction }) =>
    direction === 'left' &&
    css`
      top: calc(50% - 25px);
      left: 0;
    `}

  ${({ direction }) =>
    direction === 'right' &&
    css`
      top: calc(50% - 25px);
      right: 0;
    `};
`;

const Arrow = styled.div<ArrowProps>`
  height: 0;
  width: 0;
  border: 25px solid transparent;
  user-select: none;

  ${({ direction }) =>
    direction === 'down' &&
    css`
      border-top-color: ${COMMANDS_COLOR};
      margin-top: 25px;
    `}

  ${({ direction }) =>
    direction === 'up' &&
    css`
      border-bottom-color: ${COMMANDS_COLOR};
      margin-bottom: 25px;
    `}

  ${({ direction }) =>
    direction === 'left' &&
    css`
      border-right-color: ${COMMANDS_COLOR};
      margin-right: 25px;
    `}

  ${({ direction }) =>
    direction === 'right' &&
    css`
      border-left-color: ${COMMANDS_COLOR};
      margin-left: 25px;
    `};
`;

const Circle = styled.div`
  position: absolute;
  height: 36px;
  width: 36px;
  background: ${COMMANDS_COLOR};
  top: calc(50% - 18px);
  left: calc(50% - 18px);
  border-radius: 50%;
  box-sizing: border-box;
  user-select: none;
`;

const Commands = ({
  onSpaceChange,
  onArrowUpChange,
  onArrowDownChange,
  onArrowLeftChange,
  onArrowRightChange,
}: CommandsProps) => {
  const spaceRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const upRef = useRef<HTMLDivElement>(null);
  const downRef = useRef<HTMLDivElement>(null);

  const space = useTouchHold(spaceRef);
  const left = useTouchHold(leftRef);
  const right = useTouchHold(rightRef);
  const up = useTouchHold(upRef);
  const down = useTouchHold(downRef);

  useEffect(() => onSpaceChange(space), [space]);
  useEffect(() => onArrowUpChange(up), [up]);
  useEffect(() => onArrowLeftChange(left), [left]);
  useEffect(() => onArrowDownChange(down), [down]);
  useEffect(() => onArrowRightChange(right), [right]);

  return (
    <CommandsWrapper>
      <Circle ref={spaceRef} />

      <ArrowContainer ref={leftRef} direction="left">
        <Arrow direction="left" aria-label="left" />
      </ArrowContainer>

      <ArrowContainer ref={rightRef} direction="right">
        <Arrow direction="right" aria-label="right" />
      </ArrowContainer>

      <ArrowContainer ref={upRef} direction="up">
        <Arrow direction="up" aria-label="up" />
      </ArrowContainer>

      <ArrowContainer ref={downRef} direction="down">
        <Arrow direction="down" aria-label="down" />
      </ArrowContainer>
    </CommandsWrapper>
  );
};

export default Commands;
