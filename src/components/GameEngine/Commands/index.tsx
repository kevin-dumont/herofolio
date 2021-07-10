import React, { useEffect, useRef } from 'react';

import useTouchHold from '@hooks/useTouchHold';
import {
  CommandsWrapper,
  Circle,
  ArrowContainer,
  Arrow,
} from '@components/GameEngine/Commands/styles';
import type { CommandsProps } from '@components/GameEngine/Commands/types';

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
