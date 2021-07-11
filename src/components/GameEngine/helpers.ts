/**
 * Calculate offset of hero and landscape
 *
 * @param centerPosition The center X position consider the screen size (in elements width)
 * @param maxRightOffset The size of the landscape (in elements width)
 * @param screenSize The screen size (in elements width)
 * @param position The current hero position in specified (in elements width)
 */
export const calculateOffsets = (
  centerPosition: number,
  maxRightOffset: number,
  screenSize: number,
  position?: number
) => {
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
