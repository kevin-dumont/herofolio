import React, { useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';

import { CoinType } from '@definitions/entities';
import {
  GRID_ELEMENT_WIDTH,
  FORMATION_GRID_SIZES_LARGE,
  FORMATION_GRID_SIZES_SMALL,
} from '@constants/grid';
import { COINS } from '@constants/coins';
import useMedia from '@hooks/useMedia';
import GameEngine from '@components/GameEngine';
import { Hero } from '@components/Design/Hero';
import Coin from '@components/Design/Coin';
import { useAppDispatch, useAppSelector } from '@hooks/useAppStore';
import { move, takeCoin, selectCoins, selectHeroPositions } from '@store/game';
import { Door } from '@components/Design/School';
import { Parquet } from '@components/Design/Parquet';
import { Blackboard } from '@components/Design/Blackboard';
import { Frieze } from '@components/Design/Frieze';
import { Window } from '@components/Design/Window';
import { StudentDesk } from '@components/Design/StudentDesk';
import { Clock } from '@components/Design/Clock';
import { Platform } from '@components/Design/Platform';
import { SCHOOL_LEFT } from '@containers/Profile/constants';
import { MoveParams } from '@components/GameEngine/types';
import { useGameEngine } from '@components/GameEngine/hooks';
import {
  GRID_WIDTH,
  STUDENT_DESKS,
  STUDENT_DESKS_SMALL,
} from '@containers/Formation/constants';
import { Wallpaper } from '@components/Design/Wallpaper';
import GameLoader from '@components/GameLoader';

const Formation = () => {
  const isSmall = useMedia((_, height) => height < 600);

  const {
    GRID_HEIGHT,
    GROUND_HEIGHT,
    HERO_SIZE,
    JUMP,
    STUDENT_DESKS_BOTTOM,
    STUDENT_DESKS_HEIGHT,
  } = useMemo(
    () => (isSmall ? FORMATION_GRID_SIZES_SMALL : FORMATION_GRID_SIZES_LARGE),
    [isSmall]
  );

  const router = useRouter();
  const dispatch = useAppDispatch();
  const coins = useAppSelector(selectCoins);
  const heroPositions = useAppSelector(selectHeroPositions);

  const timeouts = useRef<NodeJS.Timeout[]>([]);

  const onTop = (p: number) => {
    if (p === 2) {
      timeouts?.current.push(
        setTimeout(() => {
          dispatch(move({ location: 'profile', position: SCHOOL_LEFT + 6 }));
          router.push('/');
        }, 200)
      );
    }
  };

  const isCoinTaken = (coin: CoinType) =>
    !!coins.find(
      ({ location, position }) =>
        coin.location === location && coin.position === position
    );

  const onMove = ({ position }: MoveParams) => {
    dispatch(move({ location: 'formation', position }));

    COINS.forEach((coin, i) => {
      if (
        coin.location === 'formation' &&
        position === coin.position &&
        !isCoinTaken(coin)
      ) {
        dispatch(takeCoin(COINS[i]));
      }
    });
  };

  useEffect(
    () => () => {
      if (timeouts.current) {
        timeouts.current.forEach(clearTimeout);
        timeouts.current = [];
      }
    },
    []
  );

  const {
    canJump,
    isJumping,
    heroLeft,
    isWalking,
    width,
    height,
    getY,
    isLoading,
    getPlanProps,
    getElementProps,
  } = useGameEngine({
    onTop,
    onMove,
    isActive: true,
    initPosition: heroPositions.formation,
    maxRightOffset: GRID_WIDTH,
    nbLines: GRID_HEIGHT,
    elementWidth: GRID_ELEMENT_WIDTH,
  });

  return (
    <>
      <GameLoader show={isLoading} />

      <GameEngine width={width} height={height} background="#aff39e ">
        {/* Hero */}
        <GameEngine.Element
          {...getElementProps({
            zIndex: 10,
            left: heroLeft,
            height: HERO_SIZE,
            width: 1,
            bottom: GROUND_HEIGHT - 1,
          })}
        >
          <Hero
            isWalking={isWalking && canJump}
            jumpHeight={getY(JUMP + 1)}
            isJumping={isJumping}
            show={!isLoading}
          />
        </GameEngine.Element>

        <GameEngine.Plan {...getPlanProps(1)}>
          {/* Wallpaper */}
          <GameEngine.Element
            {...getElementProps({
              zIndex: 0,
              top: 0,
              left: 0,
              height: GRID_WIDTH,
              width: GRID_WIDTH,
            })}
          >
            <Wallpaper />
          </GameEngine.Element>

          {/* Student Desks */}
          {STUDENT_DESKS.map(({ left, perspective }, i) => (
            <GameEngine.Element
              key={`student-desk-${left}`}
              {...getElementProps({
                left,
                id: `student-desk-${i}`,
                bottom: STUDENT_DESKS_BOTTOM,
                width: 3,
                height: STUDENT_DESKS_HEIGHT,
                zIndex: 12,
              })}
            >
              <StudentDesk perspectiveOrigin={perspective} scale="0.8" />
            </GameEngine.Element>
          ))}

          {!isSmall &&
            STUDENT_DESKS_SMALL.map(({ left, perspective }, i) => (
              <GameEngine.Element
                key={`student-desk-small-${left}`}
                {...getElementProps({
                  left,
                  id: `student-desk-${i}`,
                  bottom: STUDENT_DESKS_BOTTOM - 2,
                  width: 3,
                  height: STUDENT_DESKS_HEIGHT,
                  zIndex: 12,
                })}
              >
                <StudentDesk perspectiveOrigin={perspective} scale="0.8" />
              </GameEngine.Element>
            ))}

          {/* Door */}
          <GameEngine.Element
            {...getElementProps({
              id: 'door',
              left: 1,
              bottom: GROUND_HEIGHT,
              width: 3,
              height: 3,
            })}
          >
            <Door />
          </GameEngine.Element>

          {/* Window */}
          <GameEngine.Element
            {...getElementProps({
              id: 'window',
              left: 7,
              bottom: GROUND_HEIGHT + 2,
              width: 2,
              height: 2,
            })}
          >
            <Window />
          </GameEngine.Element>

          {/* Blackboard */}
          <GameEngine.Element
            {...getElementProps({
              id: 'blackboard',
              left: 12,
              bottom: GROUND_HEIGHT + 3,
              width: 6,
              height: 2,
            })}
          >
            <Frieze>A B C D Mes formations</Frieze>
            <Blackboard>
              <br />
              #1 Licence Web & mobile • 2017 - 2018 • Conservatoire National des
              arts et métiers
              <br />
              <br />
              <br />
              #2 BTS SIO • 2013 - 2015 • Lycée Saint-Vincent, Senlis
            </Blackboard>
          </GameEngine.Element>

          <GameEngine.Element
            {...getElementProps({
              id: 'platform',
              left: 12,
              bottom: GROUND_HEIGHT,
              width: 6,
              height: 1,
            })}
          >
            <Platform />
          </GameEngine.Element>

          {/* Clock */}
          <GameEngine.Element
            {...getElementProps({
              id: 'clock',
              left: 21,
              bottom: GROUND_HEIGHT + 2,
              width: 1,
              height: 1,
            })}
          >
            <Clock />
          </GameEngine.Element>

          {/* Coins */}
          {COINS.map(
            (coin, i) =>
              coin.location === 'formation' && (
                <GameEngine.Element
                  key={coin.location + coin.position}
                  {...getElementProps({
                    id: `coins-${i}`,
                    left: coin.position,
                    bottom: GROUND_HEIGHT - 1,
                    width: 1,
                    height: 1,
                    zIndex: 11,
                  })}
                >
                  <Coin taken={isCoinTaken(coin)} />
                </GameEngine.Element>
              )
          )}

          {/* Ground */}
          <GameEngine.Element
            {...getElementProps({
              'data-testid': 'ground',
              zIndex: 10,
              bottom: 0,
              left: 0,
              height: GROUND_HEIGHT,
              width: GRID_WIDTH,
            })}
          >
            <Parquet />
          </GameEngine.Element>
        </GameEngine.Plan>
      </GameEngine>
    </>
  );
};

export default Formation;
