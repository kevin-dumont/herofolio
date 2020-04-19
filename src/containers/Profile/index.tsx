import React, { useState, useContext, useEffect } from "react";
import GameEngine, { MoveParms } from "../../components/GameEngine";

import {
  GRID_ELEMENT_WIDTH,
  GRID_SIZES_LARGE,
  GRID_SIZES_SMALL,
} from "../../constants";
import useMedia from "../../hooks/useMedia";
import GameContext from "../../contexts/GameContext";
import { useHistory } from "react-router-dom";
import { Hero } from "../../components/Design/Hero";
import { Ground } from "../../components/Design/Ground";

import Modal from "../../components/Modal";
import { ModalRight, CommandsHelper } from "./styles";
import { Sun } from "../../components/Design/Sun";
import Clouds from "../../components/Design/Clouds";
import { Mountains } from "../../components/Design/Moutains";
import { Forest } from "../../components/Design/Forest";
import { Tree, Bamboos } from "../../components/Design/Vegetation";
import House from "../../components/Design/House";
import Case from "../../components/Design/Case";
import Coin from "../../components/Design/Coin";
import { MainTitle } from "../../components/Design/MainTitle";

// constants
export const HOUSE_LEFT = 40;
export const GRID_WIDTH = 90;
export const PROFILE_LEFT = 30;
export const LANDSCAPE_CHANGE = 45;
export const HEIGHT_OFFSET = {
  SMALL: {
    HOUSE_HEIGHT: 7,
    SUN_BOTTOM: 2,
    SUN_LEFT: 1,
    PROFILE_BOTTOM: 3,
  },
  LARGE: {
    HOUSE_HEIGHT: 6,
    SUN_BOTTOM: 3,
    SUN_LEFT: 4,
    PROFILE_BOTTOM: 5,
  },
};

const Profile = () => {
  const {
    GRID_HEIGHT,
    GROUND_HEIGHT,
    HERO_SIZE,
    JUMP,
    HOUSE_HEIGHT,
    SUN_BOTTOM,
    SUN_LEFT,
    PROFILE_BOTTOM,
  } = useMedia((_, height) =>
    height < 600
      ? { ...GRID_SIZES_SMALL, ...HEIGHT_OFFSET.SMALL }
      : { ...GRID_SIZES_LARGE, ...HEIGHT_OFFSET.LARGE }
  );

  const history = useHistory();
  const {
    coins,
    takeCoins,
    heroPositions: { profile: initPosition },
    move,
    nbJump,
    hasMove,
    incrementJump,
  } = useContext(GameContext);

  const [showPopin, setShowPopin] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [preloading, setPreloading] = useState(true);

  const closeModal = () => {
    setShowPopin(false);
    setIsActive(true);
  };

  const openModal = () => {
    setShowPopin(true);
    setIsActive(false);
  };

  const onTop = (p: number) => {
    if (p === HOUSE_LEFT + 2) {
      setTimeout(() => {
        history.push("/skills");
      }, 200);
    }
  };

  const onJump = (p: number) => {
    incrementJump();

    if (p === PROFILE_LEFT) {
      setTimeout(() => {
        openModal();
      }, 300);
    }
  };

  const onMove = ({ position }: MoveParms) => {
    move("profile", position);

    coins.forEach((coin, i) => {
      if (
        coin.location === "profile" &&
        position === coin.position &&
        !coin.taken
      ) {
        takeCoins(i);
      }
    });
  };

  const preload = () => {
    setPreloading(false);

    const timeouts: number[] = [
      setTimeout(() => setPreloading(true), 500),
      setTimeout(() => setPreloading(false), 1000),
    ];

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  };

  useEffect(() => {
    const clearPreload = preload();

    return () => {
      clearPreload();
    };
  }, []);

  return (
    <>
      <GameEngine
        isActive={isActive}
        initPosition={initPosition}
        onJump={onJump}
        onTop={onTop}
        onMove={onMove}
        groundHeight={GROUND_HEIGHT}
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
          secondPlanLeft,
          thirdPlanLeft,
          fourthPlanLeft,
          fithPlanLeft,
          isTouchDevice,
          centerPosition,
          positionInTheGrid,
          width,
          height,
          getY,
          getX,
          GameContainer,
          GameElement,
          Plan,
        }) => (
          <GameContainer
            width={width}
            height={height}
            background={
              !preloading && positionInTheGrid < LANDSCAPE_CHANGE
                ? "#79d4ff"
                : "#ffcde2"
            }
          >
            {/* Hero */}
            <GameElement
              zIndex={10}
              bottom={getY(GROUND_HEIGHT)}
              left={heroLeft * 60}
              height={getY(HERO_SIZE)}
              width={getX(1)}
            >
              <Hero
                isWalking={isWalking && canJump}
                jumpHeight={getY(JUMP)}
                isJumping={isJumping}
              />
            </GameElement>

            {/* Instructions */}
            <GameElement
              data-testid="instructions"
              zIndex={11}
              left={getX(centerPosition - 2)}
              bottom={0}
              width={getX(6)}
              height={getY(GROUND_HEIGHT)}
            >
              {(nbJump === 0 || !hasMove) && (
                <CommandsHelper>
                  {!isTouchDevice
                    ? `Use your keyboard arrows to move and space to jump!`
                    : `Use the commands on the right to move and jump!`}
                </CommandsHelper>
              )}
            </GameElement>

            <Plan zIndex={5} left={getX(firstPlanLeft)} data-testid="plan1">
              {/* Main title */}
              <GameElement
                data-testid="title"
                zIndex={9}
                left={getX(centerPosition - 3)}
                width={getX(8)}
                bottom={getY(GROUND_HEIGHT)}
                height={getX(2)}
              >
                <MainTitle />
              </GameElement>

              {/* profile Case */}
              <GameElement
                id="profile"
                left={getX(PROFILE_LEFT)}
                bottom={getY(PROFILE_BOTTOM)}
                width={getX(1)}
                height={getY(1)}
                zIndex={6}
              >
                <Case
                  isJumping={isJumping && positionInTheGrid === PROFILE_LEFT}
                  jumpHeight={getY(JUMP)}
                  onClick={openModal}
                >
                  Profile
                </Case>
              </GameElement>

              {/* Coins */}

              <GameElement
                id="coins"
                left={getX(0)}
                bottom={getY(GROUND_HEIGHT)}
                width={getX(GRID_WIDTH)}
                height={getX(3)}
                zIndex={11}
              >
                {coins.map(
                  (coin) =>
                    coin.location === "profile" && (
                      <Coin
                        key={`${coin.location + coin.position}`}
                        width={getX(1)}
                        height={getY(3)}
                        taken={coin.taken}
                        left={getX(coin.position)}
                      />
                    )
                )}

                {/* Fix : coin triggered at the begining to preload end animation */}
                {preloading && (
                  <Coin
                    taken={true}
                    width={getX(1)}
                    height={getY(3)}
                    left={getX(-1)}
                  />
                )}
              </GameElement>

              {/* House */}

              <GameElement
                data-testid="house"
                zIndex={6}
                width={getX(5)}
                left={getX(HOUSE_LEFT)}
                height={getY(HOUSE_HEIGHT)}
                bottom={getY(GROUND_HEIGHT)}
              >
                <House />
                <Bamboos right={-30} zIndex={-1} scale={0.8} rotate={2} />
              </GameElement>

              {/* First plan Trees */}
              <GameElement
                width={getX(GRID_WIDTH)}
                bottom={getY(GROUND_HEIGHT)}
                height={getY(2)}
                left={0}
              >
                <Tree scale={0.9} rotate={0} left={1100} />
                <Tree scale={1} rotate={-1} left={1700} />
                <Bamboos left={2000} zIndex={-1} scale={0.8} rotate={2} />
                <Bamboos left={2650} zIndex={-1} scale={0.9} rotate={1} />
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
                <Ground grassColor={"#4ba446"} groundColor={"#896443"} />
                <Ground
                  grassColor={"#b1ec54"}
                  groundColor={"#b8a48c"}
                  opacity={
                    !preloading && positionInTheGrid < LANDSCAPE_CHANGE ? 0 : 1
                  }
                />
              </GameElement>
            </Plan>

            {/* Second plan trees */}

            <Plan zIndex={4} left={getX(secondPlanLeft)} data-testid="plan2">
              <GameElement
                width={getX(GRID_WIDTH)}
                bottom={getY(GROUND_HEIGHT)}
                height={getY(2)}
                left={0}
              >
                <Tree scale={0.5} rotate={1} left={100} pale={true} />
                <Tree scale={0.6} rotate={0} left={350} pale={true} />
                <Tree scale={0.6} rotate={0} left={950} pale={true} />
                <Tree scale={0.5} rotate={2} left={1200} pale={true} />
                <Bamboos left={1500} zIndex={-1} scale={0.6} rotate={-1} />
                <Bamboos left={1520} zIndex={-1} scale={0.6} rotate={1} />
                <Bamboos left={1800} zIndex={-1} scale={0.3} rotate={-1} />
                <Bamboos left={1820} zIndex={-1} scale={0.3} rotate={0} />
                <Bamboos left={2050} zIndex={-1} scale={0.5} rotate={-1} />
                <Bamboos left={2070} zIndex={-1} scale={0.5} rotate={0} />
                <Bamboos left={2300} zIndex={-1} scale={0.4} rotate={0} />
                <Bamboos left={2320} zIndex={-1} scale={0.4} rotate={2} />{" "}
              </GameElement>
            </Plan>

            <Plan zIndex={3} left={getX(thirdPlanLeft)} data-testid="plan3">
              <GameElement
                height={getY(4)}
                left={0}
                bottom={getY(GROUND_HEIGHT)}
                width={getX(GRID_WIDTH + 8)}
              >
                <Forest />
                <Forest
                  color={"#8ebd43"}
                  opacity={
                    !preloading && positionInTheGrid < LANDSCAPE_CHANGE ? 0 : 1
                  }
                />
              </GameElement>
            </Plan>

            <Plan zIndex={2} left={getX(fourthPlanLeft)} data-testid="plan4">
              <GameElement
                left={0}
                bottom={getY(GROUND_HEIGHT)}
                height={getY(4)}
                width={getY(GRID_WIDTH + 8)}
              >
                <Mountains
                  angle={165}
                  percent={65}
                  moutainWidth={5}
                  mountainHeight={15}
                  background={"#6bbce2"}
                />
                <Mountains
                  angle={165}
                  percent={65}
                  moutainWidth={5}
                  mountainHeight={15}
                  background={"#9e8791"}
                  opacity={
                    !preloading && positionInTheGrid < LANDSCAPE_CHANGE ? 0 : 1
                  }
                />
              </GameElement>
            </Plan>

            <Plan zIndex={1} left={getX(fithPlanLeft)} data-testid="plan5">
              <Clouds getX={getX} getY={getY} GameElement={GameElement} />
            </Plan>

            <GameElement
              data-tesid="sun"
              left={getX(SUN_LEFT)}
              bottom={getY(SUN_BOTTOM)}
              width={getX(3)}
              height={getY(3)}
              zIndex={0}
            >
              <Sun
                color={"#ffffcc"}
                opacity={
                  !preloading && positionInTheGrid < LANDSCAPE_CHANGE ? 0 : 1
                }
              />
              <Sun
                opacity={
                  !preloading && positionInTheGrid < LANDSCAPE_CHANGE ? 1 : 0
                }
              />
            </GameElement>
          </GameContainer>
        )}
      </GameEngine>

      {showPopin && (
        <Modal>
          {({ CloseButton, Container }) => (
            <>
              <CloseButton onClick={closeModal} size={4} />
              <Container>
                <ModalRight>
                  <h2>
                    I'm <strong>Kévin Dumont</strong>, a web artisan
                  </h2>
                  <p>
                    I'm creative. I create websites in their entirety. Design,
                    development, deployment. So, we can say I'm a full stack
                    developer. I love challenges. I'm a real passionate. I'm
                    100% self-taught, I'm interested by the back-end web
                    development since I was 14. Today, I prefer the front-end
                    development because it's more sophisticated. I am still
                    learning new technologies to stay up to date and improve my
                    knowledge.
                  </p>
                </ModalRight>
              </Container>
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default Profile;
