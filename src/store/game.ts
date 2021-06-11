/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@store';
import { CoinType, Location } from '@definitions/entities';

interface GameState {
  coins: CoinType[];
  startTimestamp: number;
  nbJump: number;
  hasMove: boolean;
  heroPositions: {
    [k in Location]: number;
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
  heroPositions: {
    experiences: 0,
    hobbies: 0,
    profile: 0,
    skills: 0,
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
    takeCoin: (state, action: PayloadAction<CoinType>) => {
      state.coins.push(action.payload);
    },
    addJump: (state) => {
      state.nbJump += 1;
    },
    move: (
      state,
      action: PayloadAction<{ location: Location; position: number }>
    ) => {
      const { location, position } = action.payload;
      state.heroPositions[location] = position;
      state.hasMove = true;
    },
  },
});

export const { addJump, move, takeCoin } = gameSlice.actions;

export const selectCoins = (state: RootState) => state.game.coins;
export const selectHasMove = (state: RootState) => state.game.hasMove;
export const selectNbJump = (state: RootState) => state.game.nbJump;
export const selectHeroPositions = (state: RootState) =>
  state.game.heroPositions;

export default gameSlice.reducer;
