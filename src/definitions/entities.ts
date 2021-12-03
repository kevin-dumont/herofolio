export type Route =
  | 'profile'
  | 'skills'
  | 'experiences'
  | 'hobbies'
  | 'formation';

export interface CoinType {
  route: Route;
  position: number;
}
