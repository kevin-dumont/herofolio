import React, { useEffect, useRef } from 'react';

import { CommandsProps } from '@components/GameEngine/types';
import {
  CommandsWrapper,
  Circle,
  ArrowContainer,
  Arrow,
} from '@components/GameEngine/styles';
import { ARROW_DIRECTIONS } from '@components/GameEngine/constants';
import useTouchHold from '@hooks/useTouchHold';

const Commands = ({
  onSpaceChange,
  onArrowUpChange,
  onArrowDownChange,
  onArrowLeftChange,
  onArrowRightChange,
}: CommandsProps) => {
  const spaceRef = useRef<HTMLDivElement>(null);

  const refs = {
    up: useRef<HTMLDivElement>(null),
    right: useRef<HTMLDivElement>(null),
    down: useRef<HTMLDivElement>(null),
    left: useRef<HTMLDivElement>(null),
  };

  const space = useTouchHold(spaceRef);
  const left = useTouchHold(refs.left);
  const right = useTouchHold(refs.right);
  const up = useTouchHold(refs.up);
  const down = useTouchHold(refs.down);

  useEffect(() => onSpaceChange(space), [space]);
  useEffect(() => onArrowUpChange(up), [up]);
  useEffect(() => onArrowLeftChange(left), [left]);
  useEffect(() => onArrowDownChange(down), [down]);
  useEffect(() => onArrowRightChange(right), [right]);

  return (
    <CommandsWrapper>
      <Circle ref={spaceRef} />

      {ARROW_DIRECTIONS.map((direction) => (
        <ArrowContainer
          key={direction}
          ref={refs[direction]}
          direction={direction}
        >
          <Arrow direction={direction} aria-label={direction} />
        </ArrowContainer>
      ))}
    </CommandsWrapper>
  );
};

export default Commands;
