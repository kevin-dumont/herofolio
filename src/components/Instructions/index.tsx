import { memo } from 'react';

import GameEngine from '@components/GameEngine';
import { WithGameElementProps } from '@components/GameEngine/types';
import { CommandsHelper } from '@components/Instructions/styles';
import { useAppSelector } from '@hooks/useAppStore';
import useIsTouchDevice from '@hooks/useIsTouchDevice';
import { selectHasMove, selectNbJump } from '@store/game';

type InstructionProps = WithGameElementProps<{
  leftPosition: number;
  height: number;
}>;

const Instructions = ({ getProps, leftPosition, height }: InstructionProps) => {
  const nbJump = useAppSelector(selectNbJump);
  const hasMove = useAppSelector(selectHasMove);
  const isTouchDevice = useIsTouchDevice();

  return (
    <>
      {!isTouchDevice && (
        <GameEngine.Element
          {...getProps({
            id: 'instructions',
            left: leftPosition,
            bottom: 0,
            width: 6,
            height,
            zIndex: 11,
          })}
        >
          {(nbJump === 0 || !hasMove) && (
            <CommandsHelper>Use your keyboard arrows to move and space to jump!</CommandsHelper>
          )}
        </GameEngine.Element>
      )}
    </>
  );
};

export default memo(Instructions);
