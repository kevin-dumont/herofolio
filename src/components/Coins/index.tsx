import { useCallback, useMemo } from 'react';

import Coin from '@components/Design/Coin';
import GameEngine from '@components/GameEngine';
import { WithGameElementProps } from '@components/GameEngine/types';
import { CoinType } from '@definitions/entities';

export type CoinsProps = WithGameElementProps<{
  coins: CoinType[];
  takeCoin: (id: number) => void;
  isCoinTaken: (id: number) => boolean;
  yPosition: number;
}>;

const Coins = ({ coins, yPosition, isCoinTaken, takeCoin, getProps }: CoinsProps) => (
  <>
    {coins.map((coin) => {
      const onCollision = useCallback(() => takeCoin(coin.id), [coin.id]);

      const props = useMemo(
        () => ({
          id: `coins-${coin.id}`,
          left: coin.position,
          bottom: yPosition,
          width: 1,
          height: 1,
          zIndex: 11,
          onCollision,
        }),
        [coin.id]
      );

      return (
        <GameEngine.Element key={coin.id} {...getProps(props)}>
          <Coin taken={isCoinTaken(coin.id)} />
        </GameEngine.Element>
      );
    })}
  </>
);

export default Coins;
