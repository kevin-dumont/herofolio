import { PropsWithChildren } from 'react';

import Commands from '@components/GameEngine/Commands';
import {
  GameElement,
  GameContainer,
  Plan,
} from '@components/GameEngine/styles';
import { GameContainerProps } from '@components/GameEngine/types';

const GameEngine = (props: PropsWithChildren<GameContainerProps>) => (
  <GameContainer {...props} />
);

GameEngine.Commands = Commands;
GameEngine.Element = GameElement;
GameEngine.Plan = Plan;

export default GameEngine;
