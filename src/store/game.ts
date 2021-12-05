/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@store/index';
import { CoinType, Route } from '@definitions/entities';
import { COINS } from '@constants/coins';

interface GameState {
  coins: CoinType[];
  startTimestamp: number;
  nbJump: number;
  hasMove: boolean;
  heroLeftInRoutes: {
    [k in Route]: number;
  };
  heroLeft: number;
  firstPlanLeft: number;
  isJumping: boolean;
  isWalking: boolean;
  canJump: boolean;
  isLoading: boolean;
}

const initialState: GameState = {
  coins: [],
  startTimestamp: 0,
  nbJump: 0,
  hasMove: false,
  heroLeftInRoutes: {
    experiences: 3,
    hobbies: 2,
    profile: 3,
    skills: 2,
    formation: 2,
  },
  heroLeft: 0,
  firstPlanLeft: 0,
  isJumping: false,
  isWalking: false,
  canJump: true,
  isLoading: true,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    takeCoin: (state, action: PayloadAction<number>) => {
      const coin = COINS.find(({ id }) => id === action.payload);

      if (coin) state.coins.push(coin);
    },
    addJump: (state) => {
      state.nbJump += 1;
    },
    move: (state, action: PayloadAction<{ route: Route; position: number }>) => {
      const { route, position } = action.payload;

      state.heroLeftInRoutes[route] = position;
      state.hasMove = true;
    },
  },
});

export const { addJump, move, takeCoin } = gameSlice.actions;

export const selectCoins = (state: RootState) => state.game.coins;
export const selectHasMove = (state: RootState) => state.game.hasMove;
export const selectNbJump = (state: RootState) => state.game.nbJump;
export const selectHeroPositions = (state: RootState) => state.game.heroLeftInRoutes;

export default gameSlice.reducer;
