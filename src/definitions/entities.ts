export type Location =
  | 'profile'
  | 'skills'
  | 'experiences'
  | 'hobbies'
  | 'formation';

export interface CoinType {
  location: Location;
  position: number;
}
