import React from "react";
import styled from "styled-components";
import { BrickBg } from "./BrickBg";
import { Flower } from "./Vegetation";
import { MEDIA } from "../../constants/constants";

const darkRed = "#7d1010";

export const Bricks = styled(BrickBg)`
  position: absolute;
`;

const RoofRight = styled.div`
  height: 20px;
  width: 220px;
  background: ${darkRed};
  z-index: 1;
  transform: rotate(34deg);
  position: absolute;
  transform-origin: left;
  right: -65px;
  top: -5px;
`;

const RoofLeft = styled.div`
  height: 20px;
  width: 220px;
  background: ${darkRed};
  z-index: 1;
  transform: rotate(-34deg);
  position: absolute;
  transform-origin: right;
  left: -65px;
  top: -5px;
`;

const Porch = styled.div`
  z-index: 1;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 200px;
  margin: auto;
  width: 120px;
  height: 50px;
  border: 40px solid transparent;
  border-bottom-color: ${darkRed};

  ${MEDIA.MAX_S} {
    transform: scale(0.8) translate3d(0, 50px, 0);
    transform-origin: bottom;
  }
`;

const Door = styled.div`
  z-index: 1;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  width: 130px;
  height: 200px;
  border: 10px solid #d29a20;
  border-top: none;
  border-bottom: none;
  background: #f7d48c;

  ${MEDIA.MAX_S} {
    transform: scale(0.8);
    transform-origin: bottom;
  }

  &:before {
    width: 40px;
    height: 40px;
    background: #79d4ff;
    border: 5px solid #d29b20;
    position: absolute;
    top: 30px;
    content: "";
    display: block;
    left: 0;
    right: 0;
    margin: auto;
  }

  &:after {
    content: "";
    display: block;
    top: 50%;
    position: absolute;
    left: 10px;
    border-radius: 4px;

    background: #d29a20;
    height: 5px;
    width: 20px;
  }
`;

const House = () => {
  return (
    <>
      <Porch />
      <Door />
      <Flower
        zIndex={1}
        bottom={10}
        color="#ce3744"
        rodColor={"#4ca446"}
        left={-30}
      />
      <Flower
        zIndex={1}
        bottom={25}
        color="#ffffff"
        rodColor={"#4ca446"}
        left={10}
      />
      <Flower
        zIndex={1}
        bottom={15}
        color="#fd4f5e"
        rodColor={"#4ca446"}
        right={10}
      />
      <Flower
        zIndex={1}
        bottom={5}
        color="#ffffff"
        rodColor={"#4ca446"}
        right={-20}
      />

      <RoofRight />
      <RoofLeft />
      <Bricks
        style={{
          top: 10,
          right: 132,
          left: 132,
          bottom: "calc(100% - 25px)",
        }}
      />
      <Bricks
        style={{
          top: 25,
          right: 110,
          left: 110,
          bottom: "calc(100% - 40px)",
        }}
      />
      <Bricks
        style={{
          top: 40,
          right: 95,
          left: 95,
          bottom: "calc(100% - 55px)",
        }}
      />
      <Bricks
        style={{
          top: 55,
          right: 78,
          left: 78,
          bottom: "calc(100% - 70px)",
        }}
      />
      <Bricks
        style={{
          top: 70,
          right: 40,
          left: 40,
          bottom: "calc(100% - 100px)",
        }}
      />
      <Bricks
        style={{
          top: 85,
          right: 18,
          left: 18,
          bottom: "calc(100% - 130px)",
        }}
      />
      <Bricks
        style={{
          top: 100,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      />
    </>
  );
};

export default House;
