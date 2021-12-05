export type Route = 'profile' | 'skills' | 'experiences' | 'hobbies' | 'formation';

export interface CoinType {
  id: number;
  route: Route;
  position: number;
}
