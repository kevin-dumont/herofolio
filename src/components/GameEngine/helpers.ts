import { intersection, range } from 'lodash';

/**
 * Calculate offset of hero and landscape
 *
 * @param centerPosition The center X position consider the screen size (in elements width)
 * @param maxRightOffset The size of the landscape (in elements width)
 * @param screenSize The screen size (in elements width)
 * @param position The current hero position in specified (in elements width)
 */
const calculateOffsets = (centerPosition: number, maxRightOffset: number, screenSize: number, position?: number) => {
  let newFirstPlanLeft = 0;
  let newHeroLeft = 1;

  if (position) {
    if (maxRightOffset - position <= screenSize) {
      newHeroLeft = screenSize - Math.max(0, maxRightOffset - 4 - position);
      newFirstPlanLeft = -(maxRightOffset - screenSize - 4);
    } else if (position > centerPosition) {
      newFirstPlanLeft = -position + centerPosition;
      newHeroLeft = centerPosition;
    } else {
      newHeroLeft = position;
    }
  }

  return [newHeroLeft, newFirstPlanLeft];
};

type IsHeroOnElementParams = {
  elHeight: number;
  elWidth: number;
  elTop?: number;
  elBottom?: number;
  elLeft: number;
  nbLinesInGrid: number;
  heroLeft: number;
  heroTop: number;
  heroHeight: number;
};

const isHeroOnElement = ({
  elHeight,
  elWidth,
  elTop,
  elBottom,
  elLeft,
  nbLinesInGrid,
  heroLeft,
  heroTop,
  heroHeight,
}: IsHeroOnElementParams) => {
  const isOnSameYPosition = () => {
    const elementTop = elTop || nbLinesInGrid - (elBottom as number) - elHeight;
    const elementBottom = elementTop + elHeight;
    const heroBottom = heroTop + heroHeight;

    const heroRange = range(heroTop, heroBottom + 1);
    const elementRange = range(elementTop, elementBottom + 1);
    const intersect = intersection(elementRange, heroRange);

    return intersect.length > 0;
  };

  const elementRight = elLeft + elWidth;
  const isOnSameXPosition = heroLeft >= elLeft && heroLeft <= elementRight;

  return isOnSameXPosition && isOnSameYPosition();
};

export { calculateOffsets, isHeroOnElement };
