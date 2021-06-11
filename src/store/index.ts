import { configureStore, Store } from '@reduxjs/toolkit';

import gameReducer from '@store/game';
import { createWrapper } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const makeStore = () =>
  configureStore({
    reducer: {
      game: gameReducer,
    },
  });

export const wrapper = createWrapper<Store<RootState>>(makeStore);
