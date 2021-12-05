import React, { useCallback } from 'react';
import { useRouter } from 'next/router';

import { GRID_ELEMENT_WIDTH, GRID_SIZES_LARGE, GRID_SIZES_SMALL } from '@constants/grid';
import useMedia from '@hooks/useMedia';
import GameEngine from '@components/GameEngine';
import { useGameEngine } from '@components/GameEngine/hooks';
import { Hero } from '@components/Design/Hero';
import { Ground } from '@components/Design/Ground';
import { Sun } from '@components/Design/Sun';
import Clouds from '@components/Design/Clouds';
import { Mountains } from '@components/Design/Moutains';
import { Forest } from '@components/Design/Forest';
import { Tree, Bamboos } from '@components/Design/Vegetation';
import School from '@components/Design/School';
import Case from '@components/Design/Case';
import { MainTitle } from '@components/Design/MainTitle';
import { useAppDispatch, useAppSelector } from '@hooks/useAppStore';
import { move, takeCoin, selectHeroPositions } from '@store/game';
import { Factory } from '@components/Design/Factory';
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
import { useTimeouts } from '@hooks/useTimeouts';
import { useCoins } from '@components/Design/Coin/hooks';
import ModalProfile from '@components/ProfileModal';
import Coins from '@components/Coins';
import Instructions from '@components/Instructions';

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
    height < 600 ? { ...GRID_SIZES_SMALL, ...HEIGHT_OFFSET.SMALL } : { ...GRID_SIZES_LARGE, ...HEIGHT_OFFSET.LARGE }
  );

  const router = useRouter();
  const dispatch = useAppDispatch();

  const heroPositions = useAppSelector(selectHeroPositions);

  const [isPopinShown, showPopin, hidePopin] = useBoolean();
  const [isProfileCaseHit, hitProfileCase, stopHitProfileCase] = useBoolean();
  const [isGameEnabled, enableGame, disableGame] = useBoolean(true);

  const [coins, isCoinTaken] = useCoins('profile');
  const [addTimeout] = useTimeouts();

  const closeProfileModal = useCallback(() => {
    hidePopin();
    enableGame();
  }, []);

  const openProfileModal = useCallback(() => {
    showPopin();
    disableGame();
  }, []);

  const {
    centerPosition,
    xPosition,
    isLoading,
    getElementProps,
    getPlanProps,
    getHeroProps,
    getGameEngineProps,
    getHeroElementProps,
  } = useGameEngine({
    route: 'profile',
    initPosition: heroPositions.profile,
    isActive: isGameEnabled,
    maxRightOffset: GRID_WIDTH,
    nbLines: GRID_HEIGHT,
    elementWidth: GRID_ELEMENT_WIDTH,
    heroPositioning: {
      width: 1,
      height: HERO_SIZE,
      y: GROUND_HEIGHT,
      jumpHeight: JUMP,
    },
  });

  const onDoorOpen = useCallback(() => {
    addTimeout(() => {
      dispatch(move({ route: 'formation', position: 2 }));
      router.push('/formation');
    }, 200);
  }, []);

  const onProfileCaseHit = useCallback(() => {
    addTimeout(hitProfileCase, 100);
    addTimeout(stopHitProfileCase, 400);
    addTimeout(openProfileModal, 650);
  }, []);

  return (
    <>
      <ModalProfile show={isPopinShown} onClose={closeProfileModal} />
      <GameLoader show={isLoading} />

      <GameEngine {...getGameEngineProps()} background={xPosition < LANDSCAPE_CHANGE ? '#79d4ff' : '#ffcde2'}>
        {/* Hero */}
        <GameEngine.Element {...getHeroElementProps({ id: 'hero', zIndex: 10 })}>
          <Hero {...getHeroProps()} />
        </GameEngine.Element>

        {/* Instructions */}
        <Instructions getProps={getElementProps} leftPosition={centerPosition - 2} height={GROUND_HEIGHT} />

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
              bottom: isProfileCaseHit ? PROFILE_BOTTOM + 1 : PROFILE_BOTTOM,
              width: 1,
              height: 1,
              zIndex: 6,
              onCollision: onProfileCaseHit,
            })}
          >
            <Case>Profile</Case>
          </GameEngine.Element>

          {/* Coins */}
          <Coins
            coins={coins}
            isCoinTaken={isCoinTaken}
            takeCoin={(id: number) => dispatch(takeCoin(id))}
            getProps={getElementProps}
            yPosition={GROUND_HEIGHT}
          />

          {/* House */}
          <GameEngine.Element
            {...getElementProps({
              id: `house`,
              left: SCHOOL_LEFT,
              bottom: GROUND_HEIGHT,
              width: 13,
              height: SCHOOL_HEIGHT,
              zIndex: 6,
              onTopPress: onDoorOpen,
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
            <Ground grassColor="#b1ec54" groundColor="#b8a48c" opacity={xPosition < LANDSCAPE_CHANGE ? 0 : 1} />
          </GameEngine.Element>
        </GameEngine.Plan>

        {/* Plan 2 -> trees */}
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
            <Bamboos left={2320} zIndex={-1} scale={0.4} rotate={2} />
          </GameEngine.Element>
        </GameEngine.Plan>

        {/* Plan 3 -> Forest */}
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
            <Forest color="#8ebd43" opacity={xPosition < LANDSCAPE_CHANGE ? 0 : 1} />
          </GameEngine.Element>
        </GameEngine.Plan>

        {/* Plan 4 -> mountains */}
        <GameEngine.Plan {...getPlanProps(4)}>
          <GameEngine.Element
            {...getElementProps({
              width: GRID_WIDTH + 8,
              bottom: GROUND_HEIGHT,
              height: 4,
              left: 0,
            })}
          >
            <Mountains angle={165} percent={65} moutainWidth={5} mountainHeight={15} background="#6bbce2" />
            <Mountains
              angle={165}
              percent={65}
              moutainWidth={5}
              mountainHeight={15}
              background="#9e8791"
              opacity={xPosition < LANDSCAPE_CHANGE ? 0 : 1}
            />
          </GameEngine.Element>
        </GameEngine.Plan>

        {/* Plan 5 -> Clouds */}
        <GameEngine.Plan {...getPlanProps(5)}>
          <Clouds getProps={getElementProps} />
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
          <Sun color="#ffffcc" opacity={xPosition < LANDSCAPE_CHANGE ? 0 : 1} />
          <Sun opacity={xPosition < LANDSCAPE_CHANGE ? 1 : 0} />
        </GameEngine.Element>
      </GameEngine>
    </>
  );
};

export default Profile;
