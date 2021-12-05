import { Direction } from './types';

type GameEngineState = {
  heroLeft: number;
  firstPlanLeft: number;
  isJumping: boolean;
  isWalking: boolean;
  canJump: boolean;
  isLoading: boolean;
  up: boolean;
  left: boolean;
  right: boolean;
  down: boolean;
};

const getInitialState = (override?: Partial<GameEngineState>): GameEngineState => ({
  heroLeft: 0,
  firstPlanLeft: 0,
  isJumping: false,
  isWalking: false,
  canJump: true,
  isLoading: true,
  up: false,
  left: false,
  right: false,
  down: false,
  ...override,
});

const MOVE = 'MOVE';
const MOVE_PLAN = 'MOVE_PLAN';
const MOVE_BACK = 'MOVE_BACK';
const MOVE_FORWARD = 'MOVE_FORWARD';
const SET_LOADING = 'SET_LOADING';
const ENABLE_JUMP = 'ENABLE_JUMP';
const DISABLE_JUMP = 'DISABLE_JUMP';
const TOUCH_DIRECTION = 'TOUCH_DIRECTION';
const JUMP = 'JUMP';
const STOP_JUMP = 'STOP_JUMP';

/** actions */
const movePlan = (left: number) => ({ type: MOVE_PLAN, payload: left } as const);
const move = (heroLeft: number) => ({ type: MOVE, payload: heroLeft } as const);
const moveForward = () => ({ type: MOVE_FORWARD } as const);
const moveBack = () => ({ type: MOVE_BACK } as const);
const setLoading = (isLoading: boolean) => ({ type: SET_LOADING, payload: isLoading } as const);
const enableJump = () => ({ type: ENABLE_JUMP } as const);
const disableJump = () => ({ type: DISABLE_JUMP } as const);
const touchDirection = (direction: Direction, value: boolean) =>
  ({ type: TOUCH_DIRECTION, payload: { direction, value } } as const);
const jump = () => ({ type: JUMP } as const);
const stopJump = () => ({ type: STOP_JUMP } as const);

type GameEngineAction =
  | ReturnType<typeof move>
  | ReturnType<typeof movePlan>
  | ReturnType<typeof moveForward>
  | ReturnType<typeof moveBack>
  | ReturnType<typeof setLoading>
  | ReturnType<typeof enableJump>
  | ReturnType<typeof disableJump>
  | ReturnType<typeof touchDirection>
  | ReturnType<typeof jump>
  | ReturnType<typeof stopJump>;

const reducer = (state: GameEngineState, action: GameEngineAction) => {
  switch (action.type) {
    case MOVE_PLAN:
      if (state.isLoading) return state;

      return { ...state, firstPlanLeft: action.payload };

    case MOVE:
      if (state.isLoading) return state;

      return { ...state, heroLeft: action.payload };

    case MOVE_FORWARD:
      if (state.isLoading) return state;

      return { ...state, heroLeft: state.heroLeft + 1 };

    case MOVE_BACK:
      if (state.isLoading) return state;

      return { ...state, heroLeft: state.heroLeft - 1 };

    case SET_LOADING:
      return { ...state, isLoading: action.payload };

    case ENABLE_JUMP:
      return { ...state, canJump: true };

    case DISABLE_JUMP:
      return { ...state, canJump: false };

    case TOUCH_DIRECTION:
      if (state.isLoading) return state;

      const { direction, value } = action.payload;

      switch (direction) {
        case 'up':
          return { ...state, up: value };
        case 'down':
          return { ...state, down: value };
        case 'right':
          return { ...state, right: value, isWalking: value };
        case 'left':
          return { ...state, left: value, isWalking: value };
        default:
          return state;
      }

    case JUMP:
      if (state.isLoading) return state;

      return { ...state, isJumping: true, canJump: false };

    case STOP_JUMP:
      if (state.isLoading) return state;

      return { ...state, isJumping: false, canJump: true };

    default:
      return state;
  }
};

export type { GameEngineState, GameEngineAction };

/** exporting actions */
export { move, movePlan, moveForward, moveBack, setLoading, enableJump, disableJump, touchDirection, jump, stopJump };

export { reducer, getInitialState };
