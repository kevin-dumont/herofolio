import React from "react";
import styled from "styled-components";

const paleBrown = "#805f48";
const darkBrown = "#664020";

const background = `
  linear-gradient(to bottom, ${paleBrown} 90%, ${darkBrown} 10%) 0 0 / 100% 20px
`;

const Wood = styled.div`
  position: absolute;
  background: ${background};
`;

const RoofRight = styled.div`
  height: 20px;
  width: 220px;
  background: ${darkBrown};
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
  background: ${darkBrown};
  z-index: 1;
  transform: rotate(-34deg);
  position: absolute;
  transform-origin: right;
  left: -65px;
  top: -5px;
`;

const Hut = () => (
    <>
      <RoofRight />
      <RoofLeft />
      <Wood
        style={{
          top: 20,
          right: 120,
          left: 120,
          bottom: "calc(100% - 40px)",
        }}
      />
      <Wood
        style={{
          top: 40,
          right: 90,
          left: 90,
          bottom: "calc(100% - 60px)",
        }}
      />
      <Wood
        style={{
          top: 60,
          right: 60,
          left: 60,
          bottom: "calc(100% - 80px)",
        }}
      />
      <Wood
        style={{
          top: 80,
          right: 30,
          left: 30,
          bottom: "calc(100% - 100px)",
        }}
      />
      <Wood
        style={{
          top: 100,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      />
    </>
  );

export default Hut;
