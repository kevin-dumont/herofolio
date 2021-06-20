import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { CoinType } from '@definitions/entities';
import {
  GRID_ELEMENT_WIDTH,
  FORMATION_GRID_SIZES_LARGE,
  FORMATION_GRID_SIZES_SMALL,
} from '@constants/grid';
import { COINS } from '@constants/coins';
import useMedia from '@hooks/useMedia';
import GameEngine, { MoveParms } from '@components/GameEngine';
import { Hero } from '@components/Design/Hero';
import Coin from '@components/Design/Coin';
import { useAppDispatch, useAppSelector } from '@hooks/useAppStore';
import { move, takeCoin, selectCoins, selectHeroPositions } from '@store/game';
import { Door } from '@components/Design/House';
import { Parquet } from '@components/Design/Parquet';
import { Blackboard } from '@components/Design/Blackboard';
import { Frieze } from '@components/Design/Frieze';
import { Window } from '@components/Design/Window';
import { StudentDesk } from '@components/Design/StudentDesk';
import { Clock } from '@components/Design/Clock';
import { Platform } from '@components/Design/Platform';

// constants
export const HOUSE_LEFT = 40;
export const GRID_WIDTH = 40;
export const PROFILE_LEFT = 30;
export const LANDSCAPE_CHANGE = 45;

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
          dispatch(move({ location: 'profile', position: HOUSE_LEFT + 2 }));
          router.push('/');
        }, 200)
      );
    }
  };

  const isCoinTaken = useCallback(
    (coin: CoinType) =>
      !!coins.find(
        ({ location, position }) =>
          coin.location === location && coin.position === position
      ),
    [coins]
  );

  const onMove = ({ position }: MoveParms) => {
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

  return (
    <>
      <Head>
        <title>
          Herofolio - Le portfolio de Kevin Dumont, développeur React passionné
          depuis plus de 10 ans sur Paris
        </title>
        <meta
          name="description"
          content="Découvrez le portfolio de Kévin Dumont, développeur React passionné depuis plus de 10 ans sur la région de Paris"
        />
      </Head>
      <GameEngine
        isActive
        initPosition={heroPositions.formation}
        onTop={onTop}
        onMove={onMove}
        maxRightOffset={GRID_WIDTH}
        nbLines={GRID_HEIGHT}
        elementWidth={GRID_ELEMENT_WIDTH}
      >
        {({
          canJump,
          isJumping,
          heroLeft,
          isWalking,
          firstPlanLeft,
          width,
          height,
          getY,
          getX,
          GameContainer,
          GameElement,
          Plan,
          isLoading,
        }) => (
          <GameContainer width={width} height={height} background="#aff39e ">
            <GameElement
              zIndex={0}
              top={0}
              left={getX(firstPlanLeft)}
              height={getY(GRID_WIDTH)}
              width={getX(GRID_WIDTH)}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background:
                    'linear-gradient(90deg, rgba(0, 0, 0, 0) 60%, #9ddf8d 40%) 0 0 / 10px',
                }}
              />
            </GameElement>
            {/* Hero */}
            <GameElement
              zIndex={10}
              bottom={getY(GROUND_HEIGHT - 1)}
              left={heroLeft * 60}
              height={getY(HERO_SIZE)}
              width={getX(1)}
            >
              <Hero
                isWalking={isWalking && canJump}
                jumpHeight={getY(JUMP + 1)}
                isJumping={isJumping}
                show={!isLoading}
              />
            </GameElement>

            <Plan zIndex={11} left={getX(firstPlanLeft)} data-testid="plan1">
              {/* Student Desks */}
              <GameElement
                id="student-desk-1"
                left={getX(8)}
                bottom={getY(STUDENT_DESKS_BOTTOM)}
                width={getX(3)}
                height={getY(STUDENT_DESKS_HEIGHT)}
                zIndex={12}
              >
                <StudentDesk perspectiveOrigin="200%" scale="0.8" />
              </GameElement>
              <GameElement
                id="student-desks-2"
                left={getX(11)}
                bottom={getY(STUDENT_DESKS_BOTTOM)}
                width={getX(3)}
                height={getY(STUDENT_DESKS_HEIGHT)}
                zIndex={12}
              >
                <StudentDesk perspectiveOrigin="100%" scale="0.8" />
              </GameElement>
              <GameElement
                id="student-desks-3"
                left={getX(14)}
                bottom={getY(STUDENT_DESKS_BOTTOM)}
                width={getX(3)}
                height={getY(STUDENT_DESKS_HEIGHT)}
                zIndex={12}
              >
                <StudentDesk perspectiveOrigin="0" scale="0.8" />
              </GameElement>
              <GameElement
                id="student-desks-4"
                left={getX(17)}
                bottom={getY(STUDENT_DESKS_BOTTOM)}
                width={getX(3)}
                height={getY(STUDENT_DESKS_HEIGHT)}
                zIndex={12}
              >
                <StudentDesk perspectiveOrigin="-100%" scale="0.8" />
              </GameElement>

              {!isSmall && (
                <>
                  <GameElement
                    id="student-desk-5"
                    left={getX(7)}
                    bottom={getY(1)}
                    width={getX(3)}
                    height={getY(2)}
                    zIndex={12}
                  >
                    <StudentDesk perspectiveOrigin="200%" />
                  </GameElement>
                  <GameElement
                    id="student-desks-6"
                    left={getX(11)}
                    bottom={getY(1)}
                    width={getX(3)}
                    height={getY(2)}
                    zIndex={12}
                  >
                    <StudentDesk perspectiveOrigin="100%" />
                  </GameElement>
                  <GameElement
                    id="student-desks-7"
                    left={getX(15)}
                    bottom={getY(1)}
                    width={getX(3)}
                    height={getY(2)}
                    zIndex={12}
                  >
                    <StudentDesk perspectiveOrigin="0" />
                  </GameElement>
                  <GameElement
                    id="student-desks-4"
                    left={getX(19)}
                    bottom={getY(1)}
                    width={getX(3)}
                    height={getY(2)}
                    zIndex={12}
                  >
                    <StudentDesk perspectiveOrigin="-100%" />
                  </GameElement>
                </>
              )}
            </Plan>

            <Plan zIndex={5} left={getX(firstPlanLeft)} data-testid="plan2">
              {/* Door */}
              <GameElement
                id="door"
                left={getX(1)}
                bottom={getY(GROUND_HEIGHT)}
                width={getX(3)}
                height={getX(3)}
                zIndex={9}
              >
                <Door />
              </GameElement>

              {/* Window */}
              <GameElement
                id="window"
                left={getX(7)}
                bottom={getY(GROUND_HEIGHT + 2)}
                width={getX(2)}
                height={getX(2)}
                zIndex={9}
              >
                <Window />
              </GameElement>

              {/* Blackboard */}
              <GameElement
                id="blackboard"
                left={getX(12)}
                bottom={getY(GROUND_HEIGHT + 3)}
                width={getX(6)}
                height={getX(2)}
                zIndex={9}
              >
                <Frieze>A B C D Mes formations</Frieze>
                <Blackboard>
                  <br />
                  #1 Licence Web & mobile • 2017 - 2018 • Conservatoire National
                  des arts et métiers
                  <br />
                  <br />
                  <br />
                  #2 BTS SIO • 2013 - 2015 • Lycée Saint-Vincent, Senlis
                </Blackboard>
              </GameElement>
              <GameElement
                id="platform"
                left={getX(12)}
                bottom={getY(GROUND_HEIGHT)}
                width={getX(6)}
                height={getX(1)}
                zIndex={9}
              >
                <Platform />
              </GameElement>

              {/* Clock */}
              <GameElement
                id="clock"
                left={getX(21)}
                bottom={getY(GROUND_HEIGHT + 2)}
                width={getX(1)}
                height={getX(1)}
                zIndex={9}
              >
                <Clock />
              </GameElement>

              {/* Coins */}
              <GameElement
                id="coins"
                left={getX(0)}
                bottom={getY(GROUND_HEIGHT - 1)}
                width={getX(GRID_WIDTH)}
                height={getX(3)}
                zIndex={11}
              >
                {COINS.map(
                  (coin) =>
                    coin.location === 'formation' && (
                      <Coin
                        key={coin.location + coin.position}
                        width={getX(1)}
                        height={getY(3)}
                        taken={isCoinTaken(coin)}
                        left={getX(coin.position)}
                      />
                    )
                )}
              </GameElement>

              {/* Ground */}
              <GameElement
                data-testid="ground"
                zIndex={10}
                bottom={0}
                left={0}
                height={getY(GROUND_HEIGHT)}
                width={getX(GRID_WIDTH)}
              >
                <Parquet />
              </GameElement>
            </Plan>
          </GameContainer>
        )}
      </GameEngine>
    </>
  );
};

export default Formation;
