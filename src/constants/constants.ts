import { CoinType } from "../definitions/entities";

export const MEDIA = {
  // MIN
  MIN_XS: "@media screen and (min-width: 481px)",
  MIN_S: "@media screen and (min-width: 769px)",
  MIN_M: "@media screen and (min-width: 1025px)",
  MIN_L: "@media screen and (min-width: 1281px)",
  MIN_XL: "@media screen and (min-width: 1921px)",

  // MAX
  MAX_XS: "@media screen and (max-width: 480px)",
  MAX_S: "@media screen and (max-width: 768px)",
  MAX_M: "@media screen and (max-width: 1024px)",
  MAX_L: "@media screen and (max-width: 1280px)",
  MAX_XL: "@media screen and (max-width: 1920px)",
};

export const GRID_ELEMENT_WIDTH = 60;

export const GRID_SIZES_SMALL = {
  GRID_HEIGHT: 5,
  GROUND_HEIGHT: 1,
  HERO_SIZE: 1,
  JUMP: 2,
};

export const GRID_SIZES_LARGE = {
  GRID_HEIGHT: 10,
  GROUND_HEIGHT: 2,
  HERO_SIZE: 3,
  JUMP: 3,
};

export const FONTS = {
  DEFAULT: "'Source Sans Pro', sans-serif",
  MONO: "'PT Mono', monospace",
};

export const COINS: CoinType[] = [
  {
    location: "profile",
    position: 25,
  },
  {
    location: "profile",
    position: 28,
  },
  {
    location: "profile",
    position: 31,
  },
];
