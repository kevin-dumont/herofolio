import { COINS } from '@constants/coins';
import { CoinType, Route } from '@definitions/entities';
import { useAppSelector } from '@hooks/useAppStore';
import { selectCoins } from '@store/game';
import { useMemo } from 'react';

const useCoins = (route: Route) => {
  const coins = useAppSelector(selectCoins);

  const routeCoins = useMemo(() => COINS.filter(({ route: coinRoute }) => route === coinRoute), [route]);

  const isCoinTaken = (coinId: number) => !!coins.find(({ id }) => coinId === id);

  return [routeCoins, isCoinTaken] as const;
};

export { useCoins };
