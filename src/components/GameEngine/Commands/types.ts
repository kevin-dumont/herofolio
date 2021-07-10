export type Direction = 'up' | 'left' | 'right' | 'down';

export interface CommandsProps {
  onSpaceChange: (isPressed: boolean) => any;
  onArrowUpChange: (isPressed: boolean) => any;
  onArrowDownChange: (isPressed: boolean) => any;
  onArrowLeftChange: (isPressed: boolean) => any;
  onArrowRightChange: (isPressed: boolean) => any;
}

export interface ArrowProps {
  direction: Direction;
}

export interface ArrowContainerProps {
  direction: Direction;
}
