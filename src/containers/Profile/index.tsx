import React, { useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';

import { CoinType } from '@definitions/entities';
import {
  GRID_ELEMENT_WIDTH,
  GRID_SIZES_LARGE,
  GRID_SIZES_SMALL,
} from '@constants/grid';
import { COINS } from '@constants/coins';
import useMedia from '@hooks/useMedia';
import GameEngine from '@components/GameEngine';
import { useGameEngine } from '@components/GameEngine/hooks';
import { Hero } from '@components/Design/Hero';
import { Ground } from '@components/Design/Ground';
import Modal from '@components/Modal';
import { Sun } from '@components/Design/Sun';
import Clouds from '@components/Design/Clouds';
import { Mountains } from '@components/Design/Moutains';
import { Forest } from '@components/Design/Forest';
import { Tree, Bamboos } from '@components/Design/Vegetation';
import School from '@components/Design/School';
import Case from '@components/Design/Case';
import Coin from '@components/Design/Coin';
import { MainTitle } from '@components/Design/MainTitle';
import { useAppDispatch, useAppSelector } from '@hooks/useAppStore';
import {
  addJump,
  move,
  takeCoin,
  selectCoins,
  selectHeroPositions,
  selectHasMove,
  selectNbJump,
} from '@store/game';
import {
  ModalRight,
  CommandsHelper,
  PreloadingMask,
} from '@containers/Profile/styles';
import { Factory } from '@components/Design/Factory';
import { MoveParams } from '@components/GameEngine/types';
import useIsTouchDevice from '@hooks/useIsTouchDevice';
import {
  HEIGHT_OFFSET,
  SCHOOL_LEFT,
  PROFILE_LEFT,
  GRID_WIDTH,
  LANDSCAPE_CHANGE,
  FACTORY_LEFT,
} from '@containers/Profile/constants';
import { useBoolean } from '@hooks/useBoolean';
import GameLoader from '@components/GameLoader';

const Profile = () => {
  const {
    GRID_HEIGHT,
    GROUND_HEIGHT,
    HERO_SIZE,
    JUMP,
    SCHOOL_HEIGHT,
    FACTORY_HEIGHT,
    SUN_BOTTOM,
    SUN_LEFT,
    PROFILE_BOTTOM,
  } = useMedia((_, height) =>
    height < 600
      ? { ...GRID_SIZES_SMALL, ...HEIGHT_OFFSET.SMALL }
      : { ...GRID_SIZES_LARGE, ...HEIGHT_OFFSET.LARGE }
  );

  const router = useRouter();
  const dispatch = useAppDispatch();
  const isTouchDevice = useIsTouchDevice();

  const coins = useAppSelector(selectCoins);
  const heroPositions = useAppSelector(selectHeroPositions);
  const hasMove = useAppSelector(selectHasMove);
  const nbJump = useAppSelector(selectNbJump);

  const [isPopinShown, showPopin, hidePopin] = useBoolean();
  const [isGameEnabled, enableGame, disableGame] = useBoolean();
  const [isPreloading, beginPreload, finishPreload] = useBoolean();

  const timeouts = useRef<NodeJS.Timeout[]>([]);

  const closeModal = useCallback(() => {
    showPopin();
    enableGame();
  }, []);

  const openModal = useCallback(() => {
    hidePopin();
    disableGame();
  }, []);

  const onTop = (p: number) => {
    if (p === SCHOOL_LEFT + 6) {
      timeouts?.current.push(
        setTimeout(() => {
          dispatch(move({ location: 'formation', position: 2 }));
          router.push('/formation');
        }, 200)
      );
    }
  };

  const onJump = (p: number) => {
    dispatch(addJump());

    if (p === PROFILE_LEFT) {
      timeouts?.current.push(setTimeout(() => openModal(), 500));
    }
  };

  const isCoinTaken = (coin: CoinType) =>
    !!coins.find(
      ({ location, position }) =>
        coin.location === location && coin.position === position
    );

  const onMove = ({ position }: MoveParams) => {
    dispatch(move({ location: 'profile', position }));

    COINS.forEach((coin, i) => {
      if (
        coin.location === 'profile' &&
        position === coin.position &&
        !isCoinTaken(coin)
      ) {
        dispatch(takeCoin(COINS[i]));
      }
    });
  };

  const preload = () => {
    if (timeouts?.current) {
      timeouts.current.push(setTimeout(beginPreload, 500));
      timeouts.current.push(
        setTimeout(() => {
          finishPreload();
          enableGame();
        }, 1000)
      );
    }
  };

  useEffect(() => {
    preload();

    return () => {
      if (timeouts?.current) {
        timeouts.current.forEach(clearTimeout);
        timeouts.current = [];
      }
    };
  }, []);

  const {
    canJump,
    isJumping,
    heroLeft,
    isWalking,
    centerPosition,
    positionInTheGrid,
    width,
    height,
    getY,
    getX,
    isLoading,
    getElementProps,
    getPlanProps,
  } = useGameEngine({
    onJump,
    onTop,
    onMove,
    initPosition: heroPositions.profile,
    isActive: isGameEnabled,
    maxRightOffset: GRID_WIDTH,
    nbLines: GRID_HEIGHT,
    elementWidth: GRID_ELEMENT_WIDTH,
  });

  return (
    <>
      {isPreloading && <PreloadingMask />}
      <GameLoader show={isLoading} />

      <GameEngine
        width={width}
        height={height}
        background={
          !isPreloading && positionInTheGrid < LANDSCAPE_CHANGE
            ? '#79d4ff'
            : '#ffcde2'
        }
      >
        {/* Hero */}
        <GameEngine.Element
          {...getElementProps({
            id: 'instructions',
            left: heroLeft,
            bottom: GROUND_HEIGHT,
            width: 1,
            height: HERO_SIZE,
            zIndex: 10,
          })}
        >
          <Hero
            isWalking={isWalking && canJump}
            jumpHeight={getY(JUMP)}
            isJumping={isJumping}
            show={!isLoading}
          />
        </GameEngine.Element>

        {/* Instructions */}
        <GameEngine.Element
          {...getElementProps({
            id: 'instructions',
            left: centerPosition - 2,
            bottom: 0,
            width: 6,
            height: GROUND_HEIGHT,
            zIndex: 11,
          })}
        >
          {(nbJump === 0 || !hasMove) && (
            <CommandsHelper>
              {!isTouchDevice
                ? `Use your keyboard arrows to move and space to jump!`
                : `Use the commands on the right to move and jump!`}
            </CommandsHelper>
          )}
        </GameEngine.Element>

        <GameEngine.Plan {...getPlanProps(1)}>
          {/* Main title */}
          <GameEngine.Element
            {...getElementProps({
              id: 'title',
              left: centerPosition - 3,
              bottom: GROUND_HEIGHT,
              width: 8,
              height: 2,
              zIndex: 9,
            })}
          >
            <MainTitle />
          </GameEngine.Element>

          {/* profile Case */}
          <GameEngine.Element
            {...getElementProps({
              id: 'profile',
              left: PROFILE_LEFT,
              bottom: PROFILE_BOTTOM,
              width: 1,
              height: 1,
              zIndex: 6,
            })}
          >
            <Case
              isJumping={isJumping && positionInTheGrid === PROFILE_LEFT}
              jumpHeight={getY(1)}
              onClick={openModal}
            >
              Profile
            </Case>
          </GameEngine.Element>

          {/* Coins */}
          {COINS.map(
            (coin, i) =>
              coin.location === 'profile' && (
                <GameEngine.Element
                  key={coin.location + coin.position}
                  {...getElementProps({
                    id: `coins-${i}`,
                    left: coin.position,
                    bottom: GROUND_HEIGHT,
                    width: 1,
                    height: 1,
                    zIndex: 11,
                  })}
                >
                  <Coin taken={isCoinTaken(coin)} />
                </GameEngine.Element>
              )
          )}

          {/* preload to prevent laggy coin animation */}
          {isPreloading && (
            <GameEngine.Element
              {...getElementProps({
                id: `preloading-coins`,
                left: -1,
                bottom: GROUND_HEIGHT,
                width: 1,
                height: 1,
                zIndex: 0,
              })}
            >
              <Coin taken />
            </GameEngine.Element>
          )}

          {/* House */}
          <GameEngine.Element
            {...getElementProps({
              id: `house`,
              left: SCHOOL_LEFT,
              bottom: GROUND_HEIGHT,
              width: 13,
              height: SCHOOL_HEIGHT,
              zIndex: 6,
            })}
          >
            <School />
          </GameEngine.Element>

          {/* Factory */}
          <GameEngine.Element
            {...getElementProps({
              'data-testid': 'factory',
              zIndex: 6,
              width: 14,
              left: FACTORY_LEFT,
              height: FACTORY_HEIGHT,
              bottom: GROUND_HEIGHT,
            })}
          >
            <Factory />
          </GameEngine.Element>

          {/* First plan Trees */}
          <GameEngine.Element
            {...getElementProps({
              width: GRID_WIDTH,
              bottom: GROUND_HEIGHT,
              height: 2,
              left: 0,
            })}
          >
            <Tree scale={0.9} rotate={0} left={1100} />
            <Tree scale={1} rotate={-1} left={1700} />
            <Bamboos left={2000} zIndex={-1} scale={0.8} rotate={2} />
            <Bamboos left={2650} zIndex={-1} scale={0.9} rotate={1} />
          </GameEngine.Element>

          {/* Ground */}
          <GameEngine.Element
            {...getElementProps({
              'data-testid': 'ground',
              width: GRID_WIDTH,
              height: GROUND_HEIGHT,
              left: 0,
              bottom: 0,
              zIndex: 10,
            })}
          >
            <Ground grassColor="#4ba446" groundColor="#896443" />
            <Ground
              grassColor="#b1ec54"
              groundColor="#b8a48c"
              opacity={
                !isPreloading && positionInTheGrid < LANDSCAPE_CHANGE ? 0 : 1
              }
            />
          </GameEngine.Element>
        </GameEngine.Plan>

        {/* Second plan trees */}
        <GameEngine.Plan {...getPlanProps(2)}>
          <GameEngine.Element
            {...getElementProps({
              width: GRID_WIDTH,
              bottom: GROUND_HEIGHT,
              height: 2,
              left: 0,
            })}
          >
            <Tree scale={0.5} rotate={1} left={100} pale />
            <Tree scale={0.6} rotate={0} left={350} pale />
            <Tree scale={0.6} rotate={0} left={950} pale />
            <Tree scale={0.5} rotate={2} left={1200} pale />
            <Bamboos left={1500} zIndex={-1} scale={0.6} rotate={-1} />
            <Bamboos left={1520} zIndex={-1} scale={0.6} rotate={1} />
            <Bamboos left={1800} zIndex={-1} scale={0.3} rotate={-1} />
            <Bamboos left={1820} zIndex={-1} scale={0.3} rotate={0} />
            <Bamboos left={2050} zIndex={-1} scale={0.5} rotate={-1} />
            <Bamboos left={2070} zIndex={-1} scale={0.5} rotate={0} />
            <Bamboos left={2300} zIndex={-1} scale={0.4} rotate={0} />
            <Bamboos left={2320} zIndex={-1} scale={0.4} rotate={2} />{' '}
          </GameEngine.Element>
        </GameEngine.Plan>

        <GameEngine.Plan {...getPlanProps(3)}>
          <GameEngine.Element
            {...getElementProps({
              width: GRID_WIDTH + 8,
              bottom: GROUND_HEIGHT,
              height: 4,
              left: 0,
            })}
          >
            <Forest />
            <Forest
              color="#8ebd43"
              opacity={
                !isPreloading && positionInTheGrid < LANDSCAPE_CHANGE ? 0 : 1
              }
            />
          </GameEngine.Element>
        </GameEngine.Plan>

        <GameEngine.Plan {...getPlanProps(4)}>
          <GameEngine.Element
            {...getElementProps({
              width: GRID_WIDTH + 8,
              bottom: GROUND_HEIGHT,
              height: 4,
              left: 0,
            })}
          >
            <Mountains
              angle={165}
              percent={65}
              moutainWidth={5}
              mountainHeight={15}
              background="#6bbce2"
            />
            <Mountains
              angle={165}
              percent={65}
              moutainWidth={5}
              mountainHeight={15}
              background="#9e8791"
              opacity={
                !isPreloading && positionInTheGrid < LANDSCAPE_CHANGE ? 0 : 1
              }
            />
          </GameEngine.Element>
        </GameEngine.Plan>

        <GameEngine.Plan {...getPlanProps(5)}>
          <Clouds getX={getX} getY={getY} GameElement={GameEngine.Element} />
        </GameEngine.Plan>

        <GameEngine.Element
          {...getElementProps({
            'data-testid': 'sun',
            left: SUN_LEFT,
            bottom: SUN_BOTTOM,
            width: 3,
            height: 3,
            zIndex: 0,
          })}
        >
          <Sun
            color="#ffffcc"
            opacity={
              !isPreloading && positionInTheGrid < LANDSCAPE_CHANGE ? 0 : 1
            }
          />
          <Sun
            opacity={
              !isPreloading && positionInTheGrid < LANDSCAPE_CHANGE ? 1 : 0
            }
          />
        </GameEngine.Element>
      </GameEngine>

      <Modal show={isPopinShown} onEscapePress={closeModal}>
        {({ CloseButton, Container }) => (
          <>
            <CloseButton
              onClick={closeModal}
              size={4}
              ariaLabel="CLose profile modal"
            />
            <Container>
              <ModalRight>
                <h2>
                  I&apos;m <strong>Kévin Dumont</strong>, a web artisan
                </h2>
                <p>
                  I&apos;m creative. I create websites in their entirety.
                  Design, development, deployment. So, we can say I&apos;m a
                  full stack developer. I love challenges. I&apos;m a real
                  passionate. I&apos;m 100% self-taught, I&apos;m interested by
                  the back-end web development since I was 14. Today, I prefer
                  the front-end development because it&apos;s more
                  sophisticated. I am still learning new technologies to stay up
                  to date and improve my knowledge.
                </p>
              </ModalRight>
            </Container>
          </>
        )}
      </Modal>
    </>
  );
};

export default Profile;
